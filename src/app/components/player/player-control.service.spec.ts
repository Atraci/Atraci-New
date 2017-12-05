import { TestBed, inject } from '@angular/core/testing';

import { PlayerControlService } from './player-control.service';

describe('PlayerControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerControlService]
    });
  });

  it('should be created', inject([PlayerControlService], (service: PlayerControlService) => {
    expect(service).toBeTruthy();
  }));
});
