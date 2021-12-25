import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEncryptedFileBlockComponent } from './create-encrypted-file-block.component';

describe('CreateEncriptedFileBlockComponent', () => {
  let component: CreateEncryptedFileBlockComponent;
  let fixture: ComponentFixture<CreateEncryptedFileBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEncryptedFileBlockComponent],
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
