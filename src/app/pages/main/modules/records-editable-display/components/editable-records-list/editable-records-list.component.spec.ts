import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableRecordsListComponent } from './editable-records-list.component';

describe('EditableRecordsListComponent', () => {
  let component: EditableRecordsListComponent;
  let fixture: ComponentFixture<EditableRecordsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditableRecordsListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableRecordsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
