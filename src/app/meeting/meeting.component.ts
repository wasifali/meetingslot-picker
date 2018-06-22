import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService, UserService } from '../_services';
import { DataService } from "../_services/data.service";
import { first } from 'rxjs/operators';
import {log} from "util";
import {Router, ActivatedRoute} from "@angular/router";

// import * as $ from 'jquery';
// import { User, Meeting } from '../_models';

@Component({
    templateUrl: 'meeting.component.html',
    styleUrls: ['meeting.component.css']
})
export class MeetingComponent implements OnInit {
    newSlotDate: Date;
    newSlotTime: string;
    meetings: any = [];
    meetingList: any = [];
    selected : any;
    activeMeeting : any;
    showList = false;
    user : any;
    curr: any = [];
    isAdmin: boolean = false;

    constructor(private service: UserService,
                private data: DataService,
                public route: ActivatedRoute) {
        console.log(this.route.snapshot.paramMap.get('id'));
        this.data.currentMessage.subscribe(message => this.activeMeeting = message)

        // let currentUser = localStorage.getItem('currentUser');
        // this.user = JSON.parse(currentUser).user;
        // this.activeMeeting = JSON.parse(localStorage.getItem('activeMeeting'));
        // console.log(localStorage.getItem(this.user))
    }

    hasGroup(){
        return (this.user ? this.user.role : null );
    }

    showAttendees()
    {
        this.showList = !this.showList;
    }

    addSlot(){
        this.isAdmin = true;
    }

    search(searchWord: string){
        if(searchWord !== ''){
            this.meetingList = [];
            for(let i = 0; i < this.meetings.length; i++){
                if((this.meetings[i].name.toLowerCase()).indexOf(searchWord.toLowerCase()) !== -1) {
                    this.meetingList.push(this.meetings[i])
                }
            }
        }
        else{
            this.meetingList = this.meetings;
        }

    }

    showMeetingDetails(meeting : any) {
        this.showList = true;
        this.activeMeeting = meeting;
        this.curr = this.activeMeeting.slots;
    }

    select(slot : any){

        for(let i = 0; i < this.curr.length; i++){
            if(this.curr[i].slot_id === slot.slot_id){
                this.curr[i].isSelected = !(this.curr[i].isSelected);
            }
            this.curr[i].isSelected ? document.getElementById(slot.slot_id).classList.add('selected') : document.getElementById(slot.slot_id).classList.remove('selected');

            for (let i = 0; i < this.meetings.length; i++) {
                if (this.meetings[i].id === this.activeMeeting.id) {
                    this.meetings[i].slots = this.curr;
                }
            }
        }
    }

    saveslots() {
        let currentUser = localStorage['currentuser'];
        localStorage.clear()
        const userSlots = {
            client_id: this.activeMeeting.client_id,
            meeting_id: this.activeMeeting.id,
            updated_slots: this.curr
        }
        this.service.saveSlots(userSlots).subscribe(response => {
            this.activeMeeting.slots = this.curr;
            localStorage.setItem('currentUser', JSON.stringify({ 'currentUser': currentUser}));

            var x = document.getElementById("slot-select-success");
            x.className = "snackbar-success show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        },
        error => {
            localStorage.setItem('currentUser', JSON.stringify({ 'currentUser': currentUser}));

            var x = document.getElementById("slot-select-error");
            x.className = "snackbar-error show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        });
    }

    saveNewSlot(){
        let newSlot = {
            slot_id: 10,
            date: this.newSlotDate,
            time: this.newSlotTime,
            isSelected: false
        }
        for (let i = 0; i < this.meetings.length; i++) {
            if (this.meetings[i].id === this.activeMeeting.id) {
                this.meetings[i].slots.push(newSlot);
            }
        }

        let currentUser = localStorage['currentuser'];
        localStorage.clear()
        const userSlots = {
            client_id: this.activeMeeting.client_id,
            meeting_id: this.activeMeeting.id,
            new_slot: newSlot
        }

        this.service.addNewSlot(userSlots).subscribe(response => {
                localStorage.setItem('currentUser', JSON.stringify({ 'currentUser': currentUser}));

                var x = document.getElementById("slot-add-success");
                x.className = "snackbar-success show";
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            },
            error => {
                localStorage.setItem('currentUser', JSON.stringify({ 'currentUser': currentUser}));

                var x = document.getElementById("slot-add-error");
                x.className = "snackbar-error show";
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            });


    }

    ngOnInit() {
        let currentUser = localStorage.getItem('currentUser');
        localStorage.clear()
        this.service.getAll().subscribe(meetings => {
            this.meetings = meetings.result;
            this.meetingList = this.meetings;
            localStorage.setItem('currentUser', currentUser);
        });
    }
}