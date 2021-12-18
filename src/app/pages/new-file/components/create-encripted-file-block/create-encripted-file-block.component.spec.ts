import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEncriptedFileBlockComponent } from './create-encripted-file-block.component';

describe('CreateEncriptedFileBlockComponent', () => {
  let component: CreateEncriptedFileBlockComponent;
  let fixture: ComponentFixture<CreateEncriptedFileBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEncriptedFileBlockComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEncriptedFileBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
