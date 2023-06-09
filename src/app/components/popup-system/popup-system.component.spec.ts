import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSystemComponent } from './popup-system.component';

describe('PopupSystemComponent', () => {
  let component: PopupSystemComponent;
  let fixture: ComponentFixture<PopupSystemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupSystemComponent]
    });
    fixture = TestBed.createComponent(PopupSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
