import { TestBed } from '@angular/core/testing';

import { BrevoService } from './brevo.service';

describe('BrevoService', () => {
  let service: BrevoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrevoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
