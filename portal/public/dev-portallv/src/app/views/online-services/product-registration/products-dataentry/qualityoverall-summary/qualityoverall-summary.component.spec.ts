import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityoverallSummaryComponent } from './qualityoverall-summary.component';

describe('QualityoverallSummaryComponent', () => {
  let component: QualityoverallSummaryComponent;
  let fixture: ComponentFixture<QualityoverallSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityoverallSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityoverallSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
