import { TestBed } from '@angular/core/testing';

import { ProductsMoreService } from './products-more.service';

describe('ProductsMoreService', () => {
  let service: ProductsMoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsMoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
