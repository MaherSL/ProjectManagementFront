import { TestBed, inject } from '@angular/core/testing';

import { ProductversionService } from './productversion.service';

describe('ProductversionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductversionService]
    });
  });

  it('should be created', inject([ProductversionService], (service: ProductversionService) => {
    expect(service).toBeTruthy();
  }));
});
