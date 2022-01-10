import { TestBed } from '@angular/core/testing';
import { ElectronService } from './electron.service';

import { FileCreatorService } from './file-creator.service';

class ElectronServiceStub {}

describe('FileCreatorService', () => {
  let service: FileCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileCreatorService, { provide: ElectronService, useClass: ElectronServiceStub }],
    });
    service = TestBed.inject(FileCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
