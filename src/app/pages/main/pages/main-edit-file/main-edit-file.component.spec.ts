import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainEditFileComponent } from './main-edit-file.component';

describe('MainEditFileComponent', () => {
  let component: MainEditFileComponent;
  let fixture: ComponentFixture<MainEditFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainEditFileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainEditFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
