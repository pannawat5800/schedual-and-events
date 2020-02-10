import { Component, OnInit, Inject, Input } from '@angular/core';
import { EventModel } from '../models/event';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { dateMidnight} from '../utils/date.formate';
@Component({
  selector: 'app-modal-add-event',
  templateUrl: './modal-add-event.component.html',
  styleUrls: ['./modal-add-event.component.scss']
})
export class ModalAddEventComponent implements OnInit {

  event: EventModel;

  eventForm = this.fb.group({
    title: new FormControl('',
      [Validators.required]
    ),
    start: new FormControl(
      this.data,
      [Validators.required]
    ),
    end: new FormControl(
      null,
      [Validators.required]
    )
  })

  constructor(
    public dialogRef: MatDialogRef<ModalAddEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Date,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.formEventAction();
  }

  formEventAction(): void {

    this.eventForm.get('start').valueChanges.subscribe(
      (result: Date) => {
        const nH: number = result.getHours() + 1;
        let endDate = this.data; endDate.setHours(nH);
        //console.log("end date: ", endDate)
        this.eventForm.get('end').setValue(endDate);
        
      }
    )
  }

  onSubmit(): void {
    console.log("result: ", this.eventForm.value);
    const result = this.eventForm.value;
    this.event = {
      id: Date.now().toString(),
      title: result.title,
      release_date: dateMidnight(this.data.getTime()),
      start: new Date(result.start).getTime(),
      end: new Date(result.end).getTime()
    }

    console.log("event result: ", this.event)
    this.dialogRef.close(this.event);
    
  }


  onNoClick(): void {
    this.dialogRef.close();

  }


}


