import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEncryptedFileBlockComponent } from './create-encrypted-file-block.component';

@Component({ selector: 'app-create-encrypted-file-output', template: '' })
class CreateEncryptedFileOutputStubComponent {}

describe('CreateEncriptedFileBlockComponent', () => {
  let component: CreateEncryptedFileBlockComponent;
  let fixture: ComponentFixture<CreateEncryptedFileBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEncryptedFileBlockComponent, CreateEncryptedFileOutputStubComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEncryptedFileBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
