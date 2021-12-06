import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordItemDisplayComponent } from './record-item-display.component';

describe('RecordItemDisplayComponent', () => {
  let component: RecordItemDisplayComponent;
  let fixture: ComponentFixture<RecordItemDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordItemDisplayComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordItemDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
