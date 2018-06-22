"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var forms_2 = require("@angular/forms");
// used to create fake backend
var _helpers_1 = require("./_helpers");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var _guards_1 = require("./_guards");
var _helpers_2 = require("./_helpers");
var _services_1 = require("./_services");
var home_1 = require("./home");
var login_1 = require("./login");
var meeting_1 = require("./meeting");
var meetings_1 = require("./meetings");
var index_1 = require("./_partials/index");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpClientModule,
                forms_2.FormsModule,
                app_routing_1.routing
            ],
            declarations: [
                app_component_1.AppComponent,
                home_1.HomeComponent,
                login_1.LoginComponent,
                meeting_1.MeetingComponent,
                index_1.HeaderComponent,
                meetings_1.MeetingsComponent
            ],
            providers: [
                _guards_1.AuthGuard,
                _services_1.AuthenticationService,
                _services_1.DataService,
                _services_1.UserService,
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: _helpers_2.JwtInterceptor,
                    multi: true
                },
                // provider used to create fake backend
                _helpers_1.fakeBackendProvider
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map