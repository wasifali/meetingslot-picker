"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var home_1 = require("./home");
var login_1 = require("./login");
var _guards_1 = require("./_guards");
var meeting_1 = require("./meeting");
var meetings_1 = require("./meetings");
var appRoutes = [
    {
        path: 'meetings',
        component: home_1.HomeComponent,
        canActivate: [_guards_1.AuthGuard],
        children: [
            {
                path: '',
                component: meetings_1.MeetingsComponent
            },
            {
                path: 'meeting/:id',
                component: meeting_1.MeetingComponent
            },
        ]
    },
    { path: 'login', component: login_1.LoginComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: 'meetings' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map