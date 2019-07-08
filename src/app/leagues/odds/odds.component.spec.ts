import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OddsComponent } from './odds.component';

describe('OddsComponent', () => {
  let component: OddsComponent;
  let fixture: ComponentFixture<OddsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OddsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OddsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
