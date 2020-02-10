import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddEventComponent } from './modal-add-event.component';

describe('ModalAddEventComponent', () => {
  let component: ModalAddEventComponent;
  let fixture: ComponentFixture<ModalAddEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
