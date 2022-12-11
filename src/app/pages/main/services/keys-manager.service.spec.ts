import { TestBed } from '@angular/core/testing';

import { KeysManagerService } from './keys-manager.service';

describe('KeysManagerService', () => {
  let service: KeysManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeysManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
