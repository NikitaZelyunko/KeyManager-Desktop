import { Type } from '@angular/core';
import { Subject } from 'rxjs';

export class BaseModal<D = any, T = any> {
  constructor(public title: string, public component: Type<T>, public data: D) {}

  close() {
    this.onClose$.complete();
  }
  readonly onClose$ = new Subject<void>();
}
