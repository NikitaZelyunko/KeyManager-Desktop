import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesForEncryptFormComponent } from './files-for-encrypt-form.component';

describe('UploadFileFormComponent', () => {
  let component: FilesForEncryptFormComponent;
  let fixture: ComponentFixture<FilesForEncryptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilesForEncryptFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesForEncryptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
