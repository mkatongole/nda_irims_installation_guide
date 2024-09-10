import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedPsurProdnotificationComponent } from './shared-psur-prodnotification.component';

describe('SharedPsurProdnotificationComponent', () => {
  let component: SharedPsurProdnotificationComponent;
  let fixture: ComponentFixture<SharedPsurProdnotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedPsurProdnotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedPsurProdnotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
