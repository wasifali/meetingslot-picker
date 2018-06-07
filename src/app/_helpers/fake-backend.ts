import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let testUser = { id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' };

        let meetings = [
            {
            id: 1,
            name: 'Test Meeting',
            date: Date.now(),
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            meetingImg: 'http://icons.iconarchive.com/icons/icons-land/vista-people/256/Groups-Meeting-Light-icon.png',
            slots: [
                {
                slot_id: 123,
                date: Date.now(),
                time: '3:15',
                },
                {
                    slot_id: 124,
                    date: Date.now(),
                    time: '3:20',
                },
                {
                    slot_id: 125,
                    date: Date.now(),
                    time: '3:25',
                },
                {
                    slot_id: 126,
                    date: Date.now(),
                    time: '3:30',
                }
                ],
            responders:[
                {
                    name: 'Allen',
                    user_id: 111,
                    img: 'https://image.freepik.com/free-icon/man-dark-avatar_318-9118.jpg',
                    slots_id:[0,2]
                },
                {
                    name: 'John',
                    user_id: 121,
                    img: 'https://image.freepik.com/free-icon/man-dark-avatar_318-9118.jpg',
                    slots_id:[1,2]
                },
                {
                    name: 'Mike',
                    user_id: 131,
                    img: 'https://image.freepik.com/free-icon/man-dark-avatar_318-9118.jpg',
                    slots_id:[1,3]
                },
                {
                    name: 'William',
                    user_id: 141,
                    img: 'https://image.freepik.com/free-icon/man-dark-avatar_318-9118.jpg',
                    slots_id:[]
                }
            ],
            client_id: 'meet_8989'
        },
            {
                id: 2,
                name: 'Test Meeting',
                date: Date.now(),
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                meetingImg: 'http://icons.iconarchive.com/icons/icons-land/vista-people/256/Groups-Meeting-Light-icon.png',
                slots: [
                    {
                        slot_id: 123,
                        date: Date.now(),
                        time: '3:15',
                    },
                    {
                        slot_id: 124,
                        date: Date.now(),
                        time: '3:20',
                    },
                    {
                        slot_id: 125,
                        date: Date.now(),
                        time: '3:25',
                    },
                    {
                        slot_id: 126,
                        date: Date.now(),
                        time: '3:30',
                    }
                ],
                responders:[
                    {
                        name: 'Allen',
                        user_id: 111,
                        img: 'https://image.freepik.com/free-icon/man-dark-avatar_318-9118.jpg',
                        slots_id:[0,2]
                    },
                    {
                        name: 'John',
                        user_id: 121,
                        img: 'https://image.freepik.com/free-icon/man-dark-avatar_318-9118.jpg',
                        slots_id:[1,2]
                    },
                    {
                        name: 'Mike',
                        user_id: 131,
                        img: 'https://image.freepik.com/free-icon/man-dark-avatar_318-9118.jpg',
                        slots_id:[1,3]
                    },
                    {
                        name: 'William',
                        user_id: 141,
                        img: 'https://image.freepik.com/free-icon/man-dark-avatar_318-9118.jpg',
                        slots_id:[]
                    }
                ],
                client_id: 'meet_8989'
            }
        ];
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate
            if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {
                if (request.body.username === testUser.username && request.body.password === testUser.password) {
                    // if login details are valid return 200 OK with a fake jwt token
                    return of(new HttpResponse({ status: 200, body: { token: 'fake-jwt-token' } }));
                } else {
                    // else return 400 bad request
                    return throwError('Username or password is incorrect');
                }
            }

            // get users
            if (request.url.endsWith('/api/users') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: [meetings] }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError('Unauthorised');
                }
            }

            // pass through any requests not handled above
            return next.handle(request);
            
        }))

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};