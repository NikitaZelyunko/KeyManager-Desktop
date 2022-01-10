import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DecryptionResultManagerService } from '../../services/decryption-result-manager.service';

import { UploadFilesBlockComponent } from './upload-files-block.component';

class DecryptionResultManagerServiceStub {}

describe('UploadFilesBlockComponent', () => {
  let component: UploadFilesBlockComponent;
  let fixture: ComponentFixture<UploadFilesBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadFilesBlockComponent],
      providers: [
        { provide: DecryptionResultManagerService, useClass: DecryptionResultManagerServiceStub },
        FormBuilder,
      ],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFilesBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
