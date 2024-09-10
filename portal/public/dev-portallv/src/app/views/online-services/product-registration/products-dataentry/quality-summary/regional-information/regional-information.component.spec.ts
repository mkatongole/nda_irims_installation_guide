import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalInformationComponent } from './regional-information.component';

describe('RegionalInformationComponent', () => {
  let component: RegionalInformationComponent;
  let fixture: ComponentFixture<RegionalInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionalInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
