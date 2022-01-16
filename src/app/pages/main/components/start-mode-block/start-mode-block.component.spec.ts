import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartModeBlockComponent } from './start-mode-block.component';

describe('StartModeBlockComponent', () => {
  let component: StartModeBlockComponent;
  let fixture: ComponentFixture<StartModeBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartModeBlockComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartModeBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
