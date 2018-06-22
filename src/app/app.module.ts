import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AuthGuard } from './_guards';
import { JwtInterceptor } from './_helpers';
import { AuthenticationService, UserService, DataService } from './_services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { MeetingComponent } from './meeting'
import { MeetingsComponent } from './meetings'
import { HeaderComponent } from './_partials/index'

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        MeetingComponent,
        HeaderComponent,
        MeetingsComponent
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        DataService,
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }