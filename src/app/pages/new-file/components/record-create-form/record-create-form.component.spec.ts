import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordCreateFormComponent } from './record-create-form.component';

describe('RecordCreateFormComponent', () => {
  let component: RecordCreateFormComponent;
  let fixture: ComponentFixture<RecordCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordCreateFormComponent],
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
