import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncryptionParametersBlockComponent } from './encryption-parameters-block.component';

describe('EncryptionParametersBlockComponent', () => {
  let component: EncryptionParametersBlockComponent;
  let fixture: ComponentFixture<EncryptionParametersBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EncryptionParametersBlockComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncryptionParametersBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
