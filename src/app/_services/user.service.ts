import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { User, Meeting } from '../_models';
import {map} from "rxjs/operators";

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        // return this.http.get('http://localhost:9000/wasif/api/getallmeetings');
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');

        return this.http.post<any>('http://localhost:9000/wasif/api/getallmeetings', {}, {headers: headers});
    }
    saveSlots(data : any){
        return this.http.post('http://localhost:9000/wasif/api/users/slots', data);
    }

    addNewSlot(data : any){
        return this.http.post('http://localhost:9000/wasif/api/users/addslot', data);
    }
}