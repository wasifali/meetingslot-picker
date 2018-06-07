import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { first } from 'rxjs/operators';

import { User, Meeting } from '../_models';
import { UserService } from '../_services';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
    users: any;
    selected : any;
    activeMeeting : any;
    showList = false;
    userName = localStorage.getItem('currentUserName');
    curr: any;

    constructor(private userService: UserService) {
    }

    showMeetingDetails(meeting : any) {

        this.showList = true;
        console.log('Opening meeting :::::::::::::: ', meeting);
        // this.activeMeeting === meeting ? this.showList = this.showList : this.showList = !this.showList;
        this.activeMeeting = meeting;
        this.curr = meeting.slots;
    }

    select(slot : any){
        this.selected = slot;
        console.log(this.selected);
        console.log(this.curr);
        // console.log(this.curr.find( slot => slot.slot_id === 123 ));
    }


    ngOnInit() {
        this.userService.getAll().pipe(first()).subscribe(meetings => {
            this.users = meetings[0];
            console.log('All meetings list ::::::::: ', this.users);
        });
    }
}