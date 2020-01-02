import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryDitailComponent } from './history-ditail.component';

describe('HistoryDitailComponent', () => {
  let component: HistoryDitailComponent;
  let fixture: ComponentFixture<HistoryDitailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryDitailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryDitailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
