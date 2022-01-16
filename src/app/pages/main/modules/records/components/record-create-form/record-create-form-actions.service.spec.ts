import { TestBed } from '@angular/core/testing';

import { RecordCreateFormActions } from './record-create-form-actions.service';

describe('RecordCreateFormActions.TsService', () => {
  let service: RecordCreateFormActions;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordCreateFormActions);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
