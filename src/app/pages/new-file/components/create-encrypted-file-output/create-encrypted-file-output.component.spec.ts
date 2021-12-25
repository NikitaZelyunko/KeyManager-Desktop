import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEncryptedFileOutputComponent } from './create-encrypted-file-output.component';

describe('CreateEncriptedFileOutputComponent', () => {
  let component: CreateEncryptedFileOutputComponent;
  let fixture: ComponentFixture<CreateEncryptedFileOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEncryptedFileOutputComponent],
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
