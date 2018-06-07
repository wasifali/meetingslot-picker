import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string, file : FileReader) {
        // return this.http.post<any>('/api/authenticate', { username: username, password: password })
        //     .pipe(map((res:any) => {
        //         // login successful if there's a jwt token in the response
        //         if (res && res.token) {
        //             // store username and jwt token in local storage to keep user logged in between page refreshes
        //             localStorage.setItem('currentUser', JSON.stringify({ username, token: res.token }));
        //         }
        //     }));

        console.log(file);
        return this.http.post<any>('http://localhost:9000/wasif/login', {db:'mp', image: file.result, login:username, password:password})
            .pipe(map((res:any) => {
                console.log('Login Response ::::: ', res);
                // login successful if there's a jwt token in the response
                if (res && res.result.token) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username, token: res.result.token }));
                }
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}