import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecryptionResultBlockComponent } from './decryption-result-block.component';

describe('DecryptionResultBlockComponent', () => {
  let component: DecryptionResultBlockComponent;
  let fixture: ComponentFixture<DecryptionResultBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DecryptionResultBlockComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecryptionResultBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
