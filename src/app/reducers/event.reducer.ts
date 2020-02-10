import { EventAction, EventActionTypes } from '../actions/event.action';
import { EventModel } from '../models/event';
import { dateMidnight } from '../utils/date.formate';



// defualt value
const now: number = Date.now();
const one:number = 36000;
const eventsDefualt: Array<EventModel> = [
    {
        id: now.toString(),
        title: 'Financial Meeting',
        release_date: dateMidnight(now),
        start: Date.now(),
        end: (now + 3600000)
    },
    {
        id: (now + one).toString(),
        title: 'HR Meeting',
        release_date: dateMidnight(now),
        start: now + (one * 30),
        end: (now + (one * 30) + 3600000)
    }
]

// reducer  
export function EventReducer(state: Array<EventModel> = eventsDefualt, action: EventAction) {

    switch (action.type) {
        case (EventActionTypes.ADD_EVENT):
            return [...state, action.payload]

        case (EventActionTypes.DLETE_EVENT):
            return state.filter(e => e.id !== action.id)

        default:
            return state
    }
}