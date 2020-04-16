import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LAcountyComponent } from './lacounty.component';

describe('LAcountyComponent', () => {
  let component: LAcountyComponent;
  let fixture: ComponentFixture<LAcountyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LAcountyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LAcountyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
