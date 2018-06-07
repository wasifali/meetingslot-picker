import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, Meeting } from '../_models';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Meeting[]>('/api/users');
    }
    saveSlots(data : any){
        return this.http.post('/api/users', data);
    }
}