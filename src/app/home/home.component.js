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
var operators_1 = require("rxjs/operators");
var _services_1 = require("../_services");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(userService) {
        this.userService = userService;
        this.showList = false;
        this.userName = localStorage.getItem('currentUserName');
    }
    HomeComponent.prototype.showMeetingDetails = function (meeting) {
        this.showList = true;
        console.log('Opening meeting :::::::::::::: ', meeting);
        // this.activeMeeting === meeting ? this.showList = this.showList : this.showList = !this.showList;
        this.activeMeeting = meeting;
        this.curr = meeting.slots;
    };
    HomeComponent.prototype.select = function (slot) {
        this.selected = slot;
        console.log(this.selected);
        console.log(this.curr);
        // console.log(this.curr.find( slot => slot.slot_id === 123 ));
    };
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getAll().pipe(operators_1.first()).subscribe(function (meetings) {
            _this.users = meetings[0];
            console.log('All meetings list ::::::::: ', _this.users);
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            templateUrl: 'home.component.html',
            styleUrls: ['home.component.css']
        }),
        __metadata("design:paramtypes", [_services_1.UserService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map