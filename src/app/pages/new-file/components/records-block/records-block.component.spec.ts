import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewRecord } from 'src/app/records/types/new-record-type';
import { RecordsManagerService } from '../../services/records-manager.service';

import { RecordsBlockComponent } from './records-block.component';

@Component({ selector: 'app-record-item', template: '' })
class AppRecordItemStubComponent {
  @Input() record!: NewRecord;
}

describe('RecordsBlockComponent', () => {
  let component: RecordsBlockComponent;
  let fixture: ComponentFixture<RecordsBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordsBlockComponent, AppRecordItemStubComponent],
      providers: [RecordsManagerService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
