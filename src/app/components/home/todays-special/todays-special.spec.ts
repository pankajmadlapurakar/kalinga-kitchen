import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysSpecial } from './todays-special';

describe('TodaysSpecial', () => {
  let component: TodaysSpecial;
  let fixture: ComponentFixture<TodaysSpecial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodaysSpecial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodaysSpecial);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
