import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MaterialModule } from './material/material.module';
import { ModalAddEventComponent } from './modal-add-event/modal-add-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { StoreModule } from '@ngrx/store';
import { EventReducer } from './reducers/event.reducer';

@NgModule({
  declarations: [
    AppComponent,
    ModalAddEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    OwlNativeDateTimeModule,
    OwlDateTimeModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    StoreModule.forRoot({
      events: EventReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalAddEventComponent]
})
export class AppModule { }
