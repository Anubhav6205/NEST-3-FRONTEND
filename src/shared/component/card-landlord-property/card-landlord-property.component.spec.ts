import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLandlordPropertyComponent } from './card-landlord-property.component';

describe('CardLandlordPropertyComponent', () => {
  let component: CardLandlordPropertyComponent;
  let fixture: ComponentFixture<CardLandlordPropertyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardLandlordPropertyComponent]
    });
    fixture = TestBed.createComponent(CardLandlordPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
