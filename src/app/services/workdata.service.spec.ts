import { TestBed, inject } from '@angular/core/testing';

import { WorkdataService } from './workdata.service';

describe('WorkdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkdataService]
    });
  });

  it('should be created', inject([WorkdataService], (service: WorkdataService) => {
    expect(service).toBeTruthy();
  }));
});
