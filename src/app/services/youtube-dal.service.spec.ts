import { TestBed, inject } from '@angular/core/testing';

import { YoutubeDalService } from './youtube-dal.service';

describe('YoutubeDalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YoutubeDalService]
    });
  });

  it('should be created', inject([YoutubeDalService], (service: YoutubeDalService) => {
    expect(service).toBeTruthy();
  }));
});
