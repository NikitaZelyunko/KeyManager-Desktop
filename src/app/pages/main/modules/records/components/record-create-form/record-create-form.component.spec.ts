import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { RecordCreateFormComponent } from './record-create-form.component';

describe('RecordCreateFormComponent', () => {
  let component: RecordCreateFormComponent;
  let fixture: ComponentFixture<RecordCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordCreateFormComponent],
      providers: [FormBuilder],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
