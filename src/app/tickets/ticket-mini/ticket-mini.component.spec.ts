import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketMiniComponent } from './ticket-mini.component';

describe('TicketMiniComponent', () => {
  let component: TicketMiniComponent;
  let fixture: ComponentFixture<TicketMiniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketMiniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
