import { TestBed } from '@angular/core/testing';

import { LetService } from './let.service';

describe('LetService', () => {
  let service: LetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
