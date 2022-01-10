import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFileComponent } from './new-file.component';

@Component({ selector: 'app-records-block', template: '' })
class RecordsBlockStubComponent {}

@Component({ selector: 'app-encryption-parameters-block', template: '' })
class EncryptionParametersBlockStubComponent {}

@Component({ selector: 'app-create-encrypted-file-block', template: '' })
class CreateEncryptedFileStubComponent {}

describe('NewFileComponent', () => {
  let component: NewFileComponent;
  let fixture: ComponentFixture<NewFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NewFileComponent,
        RecordsBlockStubComponent,
        EncryptionParametersBlockStubComponent,
        CreateEncryptedFileStubComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
