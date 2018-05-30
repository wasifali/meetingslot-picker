import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
    users: User[] = [];
    activeMeeting : any;
    showList = false;
    userName = localStorage.getItem('currentUserName');
    closeResult: string;

    constructor(private userService: UserService) {
    }

    showMeetingDetails(meeting : any) {
        this.activeMeeting === meeting ? this.showList = this.showList : this.showList = !this.showList;
        this.activeMeeting = meeting;
    }


    ngOnInit() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }
}