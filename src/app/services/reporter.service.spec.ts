import { TestBed, inject } from '@angular/core/testing';

import { ReporterService } from './reporter.service';

describe('ReporterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReporterService]
    });
  });

  it('should be created', inject([ReporterService], (service: ReporterService) => {
    expect(service).toBeTruthy();
  }));
});
