import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastIconComponent } from './toast-icon.component';

describe('ToastIconComponent', () => {
  let component: ToastIconComponent;
  let fixture: ComponentFixture<ToastIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToastIconComponent]
    });
    fixture = TestBed.createComponent(ToastIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
