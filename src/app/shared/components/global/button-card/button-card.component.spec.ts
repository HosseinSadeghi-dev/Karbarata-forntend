import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCardComponent } from './button-card.component';

describe('ButtonCardComponent', () => {
  let component: ButtonCardComponent;
  let fixture: ComponentFixture<ButtonCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
