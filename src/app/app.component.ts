import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddEventComponent } from './modal-add-event/modal-add-event.component'
import { EventModel } from './models/event';
import { dateMidnight } from './utils/date.formate';
import { EventState } from './models/apps/event.state';
import { Store } from '@ngrx/store';
import { AddEvent, DeleteEvent } from './actions/event.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'scheduler';

  dateCurrent = Date.now();

  view: string = 'month'
  viewDate: Date = new Date();
  eventsCalendar$: Observable<Array<CalendarEvent>>;

  eventDayily: BehaviorSubject<Date> = new BehaviorSubject(dateMidnight(this.viewDate))
  events$: Observable<Array<EventModel>>;

  currentDateSeletor: Date = this.viewDate;

  constructor(
    public dialog: MatDialog,
    private eventStore: Store<EventState>
  ) { }

  ngOnInit(): void {
    
    this.events$ = this.eventDayily.pipe(
      switchMap(
        date => this.eventStore.select(store => store.events).pipe(
          map(
            event => event.filter(
              e => e.release_date.getTime() === date.getTime()
            )
          )
        )
      )
    )

    this.eventsCalendar$ = this.eventStore.select(store => store.events).pipe(
      map(
        event => event.map(e => ({
          id: e.id,
          title: e.title,
          start: e.release_date,
          color: {
            primary: '#e3bc08',
            secondary: '#FDF1BA'
          }
        }))
      )
    )
  }

  dayClicked(event): void {
    this.currentDateSeletor = event.date;
    this.eventDayily.next(dateMidnight(event.date));
  }

  openEventDialog(): void {
    const dialogRef = this.dialog.open(ModalAddEventComponent, {
      width: '400px',
      data: this.currentDateSeletor
    });
    dialogRef.afterClosed().subscribe(
      (result: EventModel) => {
        if (result)
          this.addEventItem(result)

        console.log('The dialog was closed')
      }
    );
  }

  addEventItem(event: EventModel) {
    this.eventStore.dispatch(new AddEvent(event))
  }

  deleEventItem(id: string) {
    this.eventStore.dispatch(new DeleteEvent(id))
  }



}
