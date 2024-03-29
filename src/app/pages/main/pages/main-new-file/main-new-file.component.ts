import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { RecordsManagerService } from 'src/app/pages/main/services/records-manager.service';
import { FileModalData } from 'src/app/shared/types/file-modal-data';
import { EncryptionFileManagerService } from '../../services/encryption-file-manager.service';

@Component({
  selector: 'app-main-new-file',
  templateUrl: './main-new-file.component.html',
  styleUrls: ['./main-new-file.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNewFileComponent implements OnInit {
  records$ = this.recordsService.getRecords();
  createdFiles$ = new BehaviorSubject<FileModalData[] | null>(null);
  constructor(
    private recordsService: RecordsManagerService,
    private encryptionFileManagerService: EncryptionFileManagerService,
    private sanitazerService: DomSanitizer
  ) {}

  // TODO написать декоратор для этого
  // TODO переделать на блокировку действия пока не завершится observable
  // TODO нужен декоратор pending на весь компонент
  onFileCreate() {
    this.encryptionFileManagerService.encryptRecords().subscribe({
      next: ([encryptedFile, privateKey, publicKey]) => {
        const files: FileModalData[] = [
          {
            label: 'Private key',
            href: this.sanitazerService.bypassSecurityTrustUrl(privateKey),
          },
          {
            label: 'Public key',
            href: this.sanitazerService.bypassSecurityTrustUrl(publicKey),
          },
          {
            label: 'Encrypted file',
            href: this.sanitazerService.bypassSecurityTrustUrl(encryptedFile),
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
    this.recordsService.reInit();
  }

  ngOnInit() {
    this.recordsService.reInit();
  }
}
