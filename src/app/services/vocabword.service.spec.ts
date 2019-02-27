import { TestBed, inject } from '@angular/core/testing';

import { VocabwordService } from './vocabword.service';

describe('VocabwordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VocabwordService]
    });
  });

  it('should be created', inject([VocabwordService], (service: VocabwordService) => {
    expect(service).toBeTruthy();
  }));
});
