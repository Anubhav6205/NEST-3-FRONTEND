import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNotificationsComponent } from './card-notifications.component';

describe('CardNotificationsComponent', () => {
  let component: CardNotificationsComponent;
  let fixture: ComponentFixture<CardNotificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardNotificationsComponent]
    });
    fixture = TestBed.createComponent(CardNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
