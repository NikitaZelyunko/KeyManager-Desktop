import { Component, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DecryptionResultManagerService } from '../../services/decryption-result-manager.service';

import { DecryptionResultBlockComponent } from './decryption-result-block.component';

class DecryptionResultManagerStubService {
  getDecryptedResult() {
    return of([]);
  }
}

@Pipe({ name: 'recordsFilter' })
class RecordsFilterStubPipe implements PipeTransform {
  transform() {
    return [];
  }
}

@Component({ selector: 'app-records-filter', template: '' })
class RecordsFilterStubComponent {}

describe('DecryptionResultBlockComponent', () => {
  let component: DecryptionResultBlockComponent;
  let fixture: ComponentFixture<DecryptionResultBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DecryptionResultBlockComponent,
        RecordsFilterStubPipe,
        RecordsFilterStubComponent,
      ],
      providers: [
        { provide: DecryptionResultManagerService, useClass: DecryptionResultManagerStubService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecryptionResultBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
