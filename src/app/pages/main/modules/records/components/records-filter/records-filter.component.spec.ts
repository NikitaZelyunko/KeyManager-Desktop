import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';

import { RecordsFilterComponent } from './records-filter.component';

describe('RecordsFilterComponent', () => {
  let component: RecordsFilterComponent;
  let fixture: ComponentFixture<RecordsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordsFilterComponent],
      providers: [UntypedFormBuilder],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
