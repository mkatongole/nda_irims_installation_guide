import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsurProdnotificationRequestComponent } from './psur-prodnotification-request.component';

describe('PsurProdnotificationRequestComponent', () => {
  let component: PsurProdnotificationRequestComponent;
  let fixture: ComponentFixture<PsurProdnotificationRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsurProdnotificationRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsurProdnotificationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
