import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainOpenFileComponent } from './main-open-file.component';

describe('MainOpenFileComponent', () => {
  let component: MainOpenFileComponent;
  let fixture: ComponentFixture<MainOpenFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainOpenFileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainOpenFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
