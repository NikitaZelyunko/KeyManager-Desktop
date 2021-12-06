import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsBlockComponent } from './records-block.component';

describe('RecordsBlockComponent', () => {
  let component: RecordsBlockComponent;
  let fixture: ComponentFixture<RecordsBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordsBlockComponent],
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
