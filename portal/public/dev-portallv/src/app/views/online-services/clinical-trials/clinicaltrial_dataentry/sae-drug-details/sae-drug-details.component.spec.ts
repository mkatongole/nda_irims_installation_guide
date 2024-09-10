import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaeDrugDetailsComponent } from './sae-drug-details.component';

describe('SaeDrugDetailsComponent', () => {
  let component: SaeDrugDetailsComponent;
  let fixture: ComponentFixture<SaeDrugDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaeDrugDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaeDrugDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
