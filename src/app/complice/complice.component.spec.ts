import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompliceComponent } from './complice.component';

describe('CompliceComponent', () => {
  let component: CompliceComponent;
  let fixture: ComponentFixture<CompliceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompliceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompliceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
