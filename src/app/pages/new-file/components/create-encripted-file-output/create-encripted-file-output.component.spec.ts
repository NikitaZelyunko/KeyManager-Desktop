import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEncriptedFileOutputComponent } from './create-encripted-file-output.component';

describe('CreateEncriptedFileOutputComponent', () => {
  let component: CreateEncriptedFileOutputComponent;
  let fixture: ComponentFixture<CreateEncriptedFileOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEncriptedFileOutputComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEncriptedFileOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
