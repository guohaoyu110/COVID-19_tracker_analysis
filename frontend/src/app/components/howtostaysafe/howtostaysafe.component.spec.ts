import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowtostaysafeComponent } from './howtostaysafe.component';

describe('HowtostaysafeComponent', () => {
  let component: HowtostaysafeComponent;
  let fixture: ComponentFixture<HowtostaysafeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowtostaysafeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowtostaysafeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
