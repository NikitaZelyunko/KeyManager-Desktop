import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFilesBlockComponent } from './upload-files-block.component';

describe('UploadFilesBlockComponent', () => {
  let component: UploadFilesBlockComponent;
  let fixture: ComponentFixture<UploadFilesBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadFilesBlockComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFilesBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
