import { Action } from '@ngrx/store';
import { EventModel } from '../models/event';


export enum EventActionTypes {
    ADD_EVENT = '[Add Event] in the schedual',
    DLETE_EVENT = '[Delete Event] in the schedual'
}


// constructor action
export class AddEvent implements Action {
    readonly type = EventActionTypes.ADD_EVENT

    constructor(public payload: EventModel) { }
}

export class DeleteEvent implements Action {
    readonly type = EventActionTypes.DLETE_EVENT

    constructor(public id: string) { }
}

export type EventAction = AddEvent | DeleteEvent;
