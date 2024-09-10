import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnexStoreComponent } from './annex-store.component';

describe('AnnexStoreComponent', () => {
  let component: AnnexStoreComponent;
  let fixture: ComponentFixture<AnnexStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnexStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnexStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
