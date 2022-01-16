import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadonlyRecordsListComponent } from './readonly-records-list.component';

describe('ReadonlyRecordsListComponent', () => {
  let component: ReadonlyRecordsListComponent;
  let fixture: ComponentFixture<ReadonlyRecordsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadonlyRecordsListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadonlyRecordsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
