import { TestBed } from '@angular/core/testing';

import { RegLogServiceService } from './reg-log-service.service';

describe('RegLogServiceService', () => {
  let service: RegLogServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegLogServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
