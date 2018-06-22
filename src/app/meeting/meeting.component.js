"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var _services_1 = require("../_services");
var data_service_1 = require("../_services/data.service");
var router_1 = require("@angular/router");
// import * as $ from 'jquery';
// import { User, Meeting } from '../_models';
var MeetingComponent = /** @class */ (function () {
    function MeetingComponent(service, data, route) {
        var _this = this;
        this.service = service;
        this.data = data;
        this.route = route;
        this.meetings = [];
        this.meetingList = [];
        this.showList = false;
        this.curr = [];
        this.isAdmin = false;
        console.log(this.route.snapshot.paramMap.get('id'));
        this.data.currentMessage.subscribe(function (message) { return _this.activeMeeting = message; });
        // let currentUser = localStorage.getItem('currentUser');
        // this.user = JSON.parse(currentUser).user;
        // this.activeMeeting = JSON.parse(localStorage.getItem('activeMeeting'));
        // console.log(localStorage.getItem(this.user))
    }
    MeetingComponent.prototype.hasGroup = function () {
        return (this.user ? this.user.role : null);
    };
    MeetingComponent.prototype.showAttendees = function () {
        this.showList = !this.showList;
    };
    MeetingComponent.prototype.addSlot = function () {
        this.isAdmin = true;
    };
    MeetingComponent.prototype.search = function (searchWord) {
        if (searchWord !== '') {
            this.meetingList = [];
            for (var i = 0; i < this.meetings.length; i++) {
                if ((this.meetings[i].name.toLowerCase()).indexOf(searchWord.toLowerCase()) !== -1) {
                    this.meetingList.push(this.meetings[i]);
                }
            }
        }
        else {
            this.meetingList = this.meetings;
        }
    };
    MeetingComponent.prototype.showMeetingDetails = function (meeting) {
        this.showList = true;
        this.activeMeeting = meeting;
        this.curr = this.activeMeeting.slots;
    };
    MeetingComponent.prototype.select = function (slot) {
        for (var i = 0; i < this.curr.length; i++) {
            if (this.curr[i].slot_id === slot.slot_id) {
                this.curr[i].isSelected = !(this.curr[i].isSelected);
            }
            this.curr[i].isSelected ? document.getElementById(slot.slot_id).classList.add('selected') : document.getElementById(slot.slot_id).classList.remove('selected');
            for (var i_1 = 0; i_1 < this.meetings.length; i_1++) {
                if (this.meetings[i_1].id === this.activeMeeting.id) {
                    this.meetings[i_1].slots = this.curr;
                }
            }
        }
    };
    MeetingComponent.prototype.saveslots = function () {
        var _this = this;
        var currentUser = localStorage['currentuser'];
        localStorage.clear();
        var userSlots = {
            client_id: this.activeMeeting.client_id,
            meeting_id: this.activeMeeting.id,
            updated_slots: this.curr
        };
        this.service.saveSlots(userSlots).subscribe(function (response) {
            _this.activeMeeting.slots = _this.curr;
            localStorage.setItem('currentUser', JSON.stringify({ 'currentUser': currentUser }));
            var x = document.getElementById("slot-select-success");
            x.className = "snackbar-success show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
        }, function (error) {
            localStorage.setItem('currentUser', JSON.stringify({ 'currentUser': currentUser }));
            var x = document.getElementById("slot-select-error");
            x.className = "snackbar-error show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
        });
    };
    MeetingComponent.prototype.saveNewSlot = function () {
        var newSlot = {
            slot_id: 10,
            date: this.newSlotDate,
            time: this.newSlotTime,
            isSelected: false
        };
        for (var i = 0; i < this.meetings.length; i++) {
            if (this.meetings[i].id === this.activeMeeting.id) {
                this.meetings[i].slots.push(newSlot);
            }
        }
        var currentUser = localStorage['currentuser'];
        localStorage.clear();
        var userSlots = {
            client_id: this.activeMeeting.client_id,
            meeting_id: this.activeMeeting.id,
            new_slot: newSlot
        };
        this.service.addNewSlot(userSlots).subscribe(function (response) {
            localStorage.setItem('currentUser', JSON.stringify({ 'currentUser': currentUser }));
            var x = document.getElementById("slot-add-success");
            x.className = "snackbar-success show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
        }, function (error) {
            localStorage.setItem('currentUser', JSON.stringify({ 'currentUser': currentUser }));
            var x = document.getElementById("slot-add-error");
            x.className = "snackbar-error show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
        });
    };
    MeetingComponent.prototype.ngOnInit = function () {
        var _this = this;
        var currentUser = localStorage.getItem('currentUser');
        localStorage.clear();
        this.service.getAll().subscribe(function (meetings) {
            _this.meetings = meetings.result;
            _this.meetingList = _this.meetings;
            localStorage.setItem('currentUser', currentUser);
        });
    };
    MeetingComponent = __decorate([
        core_1.Component({
            templateUrl: 'meeting.component.html',
            styleUrls: ['meeting.component.css']
        }),
        __metadata("design:paramtypes", [_services_1.UserService,
            data_service_1.DataService,
            router_1.ActivatedRoute])
    ], MeetingComponent);
    return MeetingComponent;
}());
exports.MeetingComponent = MeetingComponent;
//# sourceMappingURL=meeting.component.js.map