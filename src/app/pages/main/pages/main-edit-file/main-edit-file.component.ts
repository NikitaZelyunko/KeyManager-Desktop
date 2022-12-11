import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  map,
  BehaviorSubject,
  share,
  combineLatest,
  Subscription,
  Observer,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { RadioGroupVariant } from 'src/app/shared/components/radio-group/radio-group-variant';
import { FileModalData } from 'src/app/shared/types/file-modal-data';
import { isPendingValue, PendingValue } from 'src/app/types/loading-value';
import { FileInputValue } from 'src/app/ui-kit/file-input/components/file-input/file-input.component';
import { LoadingValue } from 'src/app/utils/loading-value';
import { MainEditFileService } from './main-edit-file.service';

// TODO перенести в другое место
class ReactiveValue<T> {
  private source!: BehaviorSubject<T | undefined>;
  constructor(private state?: T) {
    this.source = new BehaviorSubject(state);
  }

  get value(): T | undefined {
    return this.state;
  }

  set value(value: T | undefined) {
    this.state = value;
    this.source.next(value);
  }

  asObservable() {
    return this.source.asObservable();
  }
}

type KeysForSaveMode = 'useCurrent' | 'createNew';

@Component({
  selector: 'app-main-edit-file',
  templateUrl: './main-edit-file.component.html',
  styleUrls: ['./main-edit-file.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MainEditFileService],
})
export class MainEditFileComponent implements OnInit, OnDestroy {
  private $destroy = new Subject<void>();
  // TODO возможно share можно будет убрать когда станет понятно что делать с saveEnabled$
  records$ = this.componentService.getRecords().pipe(
    // TODO превратить это в оператор
    map(
      (value): LoadingValue<Exclude<typeof value, PendingValue>> =>
        isPendingValue(value) ? { loading: true } : { value, loading: false }
    ),
    share()
  );

  readonly keysForSaveModeVariants: RadioGroupVariant<KeysForSaveMode>[] = [
    {
      label: 'Use current',
      value: 'useCurrent',
      checked: false,
    },
    {
      label: 'Create new',
      value: 'createNew',
      checked: false,
    },
  ];

  keysForSaveMode = new ReactiveValue<KeysForSaveMode>('useCurrent');

  private saveEnabledSource$ = combineLatest([
    this.records$.pipe(map((value) => !value.loading)),
    this.keysForSaveMode.asObservable(),
    this.componentService.keyFilesUploaded(),
  ]).pipe(
    map(
      ([recordsLoaded, currentKeyForSave, keysUploaded]) =>
        recordsLoaded && (currentKeyForSave === 'createNew' || keysUploaded)
    )
  );

  saveEnabled$ = new BehaviorSubject(false);

  createdFiles$ = new BehaviorSubject<FileModalData[] | null>(null);

  constructor(
    public componentService: MainEditFileService,
    private sanitazerService: DomSanitizer
  ) {}

  ngOnInit(): void {
    // TODO надо отписаться
    // TODO надо подумать как сделать без подписки
    this.saveEnabledSource$.pipe(takeUntil(this.$destroy)).subscribe(this.saveEnabled$);

    this.saveEnabledSource$.pipe(takeUntil(this.$destroy)).subscribe((value) => {
      if (!value) {
        this.createdFiles$.next(null);
      }
    });
  }

  ngOnDestroy(): void {
    this.$destroy.next();
  }

  private publicKeyFileUploading!: Subscription;
  // TODO сделать декоратор для отписки от работающего потока при каждом вызове
  onPublicKeyUpload(files: FileInputValue) {
    if (this.publicKeyFileUploading) {
      this.publicKeyFileUploading.unsubscribe();
    }
    this.publicKeyFileUploading = this.componentService.uploadPublicKeyFile(files).subscribe();
  }

  private savePending!: Subscription;
  onSave() {
    if (!this.keysForSaveMode.value) {
      return;
    }
    if (this.savePending) {
      this.savePending.unsubscribe();
    }
    let filesSource: Observable<[string, string, string]>;
    if (this.keysForSaveMode.value === 'createNew') {
      filesSource = this.componentService.encryptWithNewKeys();
      // TODO проверить, что ключи для шифрования созданы
      // TODO перешифровать новый список новыми ключами
    } else if (this.keysForSaveMode.value === 'useCurrent') {
      filesSource = this.componentService.encryptWithOldKeys();
      // TODO проверить, что публичный и остальные файлы созданы
      // TODO перешифровать новый список текущими ключами
    }
    this.savePending = filesSource!.pipe().subscribe(this.createFiles());
  }

  // TODO написать декоратор для этого
  // TODO переделать на блокировку действия пока не завершится observable
  // TODO нужен декоратор pending на весь компонент
  private createFiles(): Partial<Observer<[string, string, string]>> {
    return {
      next: ([encryptedFile, privateKey, publicKey]: [string, string, string]) => {
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
    };
  }
}
