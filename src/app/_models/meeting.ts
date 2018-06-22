export class Meeting {
    id: number;
    description: string;
    meetingImg: string;
    name: string;
    date: string;
    slots: [{
        slot_id: string,
        date: Date,
        time: string,
        isSelected: boolean
    }];
    responders:[{
        name: string,
        user_id: string,
        img: string,
        slots_id:[number]
    }]
    client_id: string
}