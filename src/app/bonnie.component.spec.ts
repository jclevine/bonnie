import { TestBed, async } from '@angular/core/testing';
import { BonnieComponent } from './bonnie.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BonnieComponent
      ],
    }).compileComponents();
  }));

  it('should create the bonnie', () => {
    const fixture = TestBed.createComponent(BonnieComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'complice'`, () => {
    const fixture = TestBed.createComponent(BonnieComponent);
    const app = fixture.componentInstance;
    expect(app).toEqual('bonnie');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(BonnieComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('bonnie bonnie is running!');
  });
});
