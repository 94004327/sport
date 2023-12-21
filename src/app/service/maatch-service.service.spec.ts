import { TestBed } from '@angular/core/testing';

import { MaatchServiceService } from './maatch-service.service';

describe('MaatchServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaatchServiceService = TestBed.get(MaatchServiceService);
    expect(service).toBeTruthy();
  });
});
