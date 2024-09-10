import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductNotificationGeneralDetailsComponent } from './product-notification-general-details.component';

describe('ProductNotificationGeneralDetailsComponent', () => {
  let component: ProductNotificationGeneralDetailsComponent;
  let fixture: ComponentFixture<ProductNotificationGeneralDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductNotificationGeneralDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductNotificationGeneralDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
