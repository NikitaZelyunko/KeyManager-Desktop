import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNewFileComponent } from './main-new-file.component';

describe('MainNewFileComponent', () => {
  let component: MainNewFileComponent;
  let fixture: ComponentFixture<MainNewFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainNewFileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNewFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
