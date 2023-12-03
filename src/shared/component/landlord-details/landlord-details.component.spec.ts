import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordDetailsComponent } from './landlord-details.component';

describe('LandlordDetailsComponent', () => {
  let component: LandlordDetailsComponent;
  let fixture: ComponentFixture<LandlordDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandlordDetailsComponent]
    });
    fixture = TestBed.createComponent(LandlordDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
