import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EncryptionFileManagerService } from '../../services/encryption-file-manager.service';
import { RecordsManagerService } from '../../services/records-manager.service';

import { CreateEncryptedFileOutputComponent } from './create-encrypted-file-output.component';

class EncryptionFileManagerServiceStub {}
class RecordsManagerServiceStub {}

describe('CreateEncriptedFileOutputComponent', () => {
  let component: CreateEncryptedFileOutputComponent;
  let fixture: ComponentFixture<CreateEncryptedFileOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEncryptedFileOutputComponent],
      providers: [
        { provide: EncryptionFileManagerService, useClass: EncryptionFileManagerServiceStub },
        { provide: RecordsManagerService, useClass: RecordsManagerServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEncryptedFileOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
