import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';
import { MeetingComponent } from './meeting'
import { MeetingsComponent } from './meetings'

const appRoutes: Routes = [
    {
        path: 'meetings',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children:[
            {
                path: '',
                component: MeetingsComponent
            },
            {
                path: 'meeting/:id',
                component: MeetingComponent
            },
        ]
    },
    { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: 'meetings' }
];

export const routing = RouterModule.forRoot(appRoutes);