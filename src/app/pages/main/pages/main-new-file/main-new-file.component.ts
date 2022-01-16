import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { RecordsManagerService } from 'src/app/pages/main/services/records-manager.service';
import { FileModalData } from 'src/app/shared/types/file-modal-data';
import { EncryptionFileManagerService } from '../../services/encryption-file-manager.service';

@Component({
  selector: 'app-main-new-file',
  templateUrl: './main-new-file.component.html',
  styleUrls: ['./main-new-file.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNewFileComponent implements OnInit, OnDestroy {
  private unsubscriber$ = new Subject<void>();
  records$ = this.recordsService.getRecords().pipe(takeUntil(this.unsubscriber$));
  createdFiles$ = new BehaviorSubject<FileModalData[] | null>(null);
  constructor(
    private recordsService: RecordsManagerService,
    private encryptionFileManagerService: EncryptionFileManagerService,
    private sanitazionService: DomSanitizer
  ) {}

  // TODO написать декоратор для этого
  // TODO переделать на блокировку действия пока не завершится observable
  // TODO нужен декоратор pending на весь компонент
  onFileCreate() {
    this.encryptionFileManagerService.createFiles().subscribe({
      next: ([encryptedFile, privateKey, publicKey]) => {
        const files: FileModalData[] = [
          {
            label: 'Private key',
            href: this.sanitazionService.bypassSecurityTrustUrl(privateKey),
          },
          {
            label: 'Public key',
            href: this.sanitazionService.bypassSecurityTrustUrl(publicKey),
          },
          {
            label: 'Encrypted file',
            href: this.sanitazionService.bypassSecurityTrustUrl(encryptedFile),
          },
        ];
        this.createdFiles$.next(files);
      },
      error: () => {
        this.createdFiles$.next(null);
      },
    });
  }

  // TODO написать декоратор для этого
  // TODO переделать на блокировку действия пока не завершится observable
  // TODO написать декоратор для прекращения всех активных observables
  onClear() {
    this.createdFiles$.next(null);
    this.recordsService.reset();
  }

  ngOnInit() {
    this.recordsService.init();
  }

  ngOnDestroy(): void {
    this.unsubscriber$.complete();
  }
}
