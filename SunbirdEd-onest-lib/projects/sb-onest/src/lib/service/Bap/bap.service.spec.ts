import { TestBed } from '@angular/core/testing';

import { BapService } from './bap.service';

describe('BapService', () => {
  let service: BapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
