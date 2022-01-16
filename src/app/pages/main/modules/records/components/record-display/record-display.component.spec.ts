import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordDisplayComponent } from './record-display.component';

describe('RecordDisplayComponent', () => {
  let component: RecordDisplayComponent;
  let fixture: ComponentFixture<RecordDisplayComponent>;
  const defaultRecord = { title: '', description: '', login: '', password: '' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordDisplayComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordDisplayComponent);
    component = fixture.componentInstance;
    component.record = defaultRecord;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
