import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { OpenFileComponent } from './open-file.component';

@Component({ selector: 'app-upload-files-block', template: '' })
class UploadFilesBlockStubComponent {}

@Component({ selector: 'app-decryption-result-block', template: '' })
class DecryptionResultBlockStubComponent {}

describe('OpenFileComponent', () => {
  let component: OpenFileComponent;
  let fixture: ComponentFixture<OpenFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        OpenFileComponent,
        UploadFilesBlockStubComponent,
        DecryptionResultBlockStubComponent,
      ],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
