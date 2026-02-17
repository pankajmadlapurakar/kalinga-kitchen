import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSpecialsComponent } from './manage-specials-component';

describe('ManageSpecialsComponent', () => {
  let component: ManageSpecialsComponent;
  let fixture: ComponentFixture<ManageSpecialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSpecialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSpecialsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
