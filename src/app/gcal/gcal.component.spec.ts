import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GcalComponent } from './gcal.component';

describe('GcalComponent', () => {
  let component: GcalComponent;
  let fixture: ComponentFixture<GcalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GcalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GcalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
