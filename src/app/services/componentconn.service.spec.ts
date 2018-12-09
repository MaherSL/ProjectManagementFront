import { TestBed, inject } from '@angular/core/testing';

import { ComponentconnService } from './componentconn.service';

describe('ComponentconnService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComponentconnService]
    });
  });

  it('should be created', inject([ComponentconnService], (service: ComponentconnService) => {
    expect(service).toBeTruthy();
  }));
});
