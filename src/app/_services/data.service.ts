import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

    private activeMeeting = new BehaviorSubject({});
    currentMessage = this.activeMeeting.asObservable();

    constructor() { }

    changeMessage(message: any) {
        this.activeMeeting.next(message)
    }

}