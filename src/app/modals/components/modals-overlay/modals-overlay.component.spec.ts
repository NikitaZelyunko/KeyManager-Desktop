import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalsOverlayComponent } from './modals-overlay.component';

describe('ModalsOverlayComponent', () => {
  let component: ModalsOverlayComponent;
  let fixture: ComponentFixture<ModalsOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalsOverlayComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
