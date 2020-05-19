import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtmComponent } from './rtm.component';

describe('RtmComponent', () => {
  let component: RtmComponent;
  let fixture: ComponentFixture<RtmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
