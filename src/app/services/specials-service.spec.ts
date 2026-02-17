import { TestBed } from '@angular/core/testing';

import { SpecialsService } from './specials-service';

describe('SpecialsService', () => {
  let service: SpecialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
