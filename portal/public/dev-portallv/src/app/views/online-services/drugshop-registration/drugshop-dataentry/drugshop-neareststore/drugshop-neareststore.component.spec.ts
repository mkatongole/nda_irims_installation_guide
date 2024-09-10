import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugshopNeareststoreComponent } from './drugshop-neareststore.component';

describe('DrugshopNeareststoreComponent', () => {
  let component: DrugshopNeareststoreComponent;
  let fixture: ComponentFixture<DrugshopNeareststoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugshopNeareststoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugshopNeareststoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
