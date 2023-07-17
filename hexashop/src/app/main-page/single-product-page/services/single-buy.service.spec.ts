import { TestBed } from '@angular/core/testing';

import { SingleBuyService } from './single-buy.service';

describe('SingleBuyService', () => {
  let service: SingleBuyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingleBuyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
