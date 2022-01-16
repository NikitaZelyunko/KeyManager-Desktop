import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewRecord } from 'src/app/records/types/new-record-type';

import { RecordItemComponent } from './record-item.component';

@Component({ selector: 'app-record-create-form', template: '' })
class RecordCreateFormStubComponent {
  @Input() record!: NewRecord;
}

describe('RecordItemComponent', () => {
  let component: RecordItemComponent;
  let fixture: ComponentFixture<RecordItemComponent>;
  const defaultRecord: NewRecord = { title: '', description: '', login: '', password: '' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordItemComponent, RecordCreateFormStubComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordItemComponent);
    component = fixture.componentInstance;
    component.record = defaultRecord;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
