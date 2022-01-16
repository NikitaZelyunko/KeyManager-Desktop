import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NewRecord } from '../../types/new-record-type';

interface NamedPayload<P> {
  name: string;
  payload: P;
}

interface PayloadManager<P, S> {
  payload$: Subject<P>;
  status$: Subject<S>;
}

// ПОЛНАЯ ТУФТА
@Injectable()
export class RecordCreateFormActions {
  private saveManagers = new Map<string, PayloadManager<NewRecord, void>>();

  save(payload: NamedPayload<NewRecord>) {
    const { name } = payload;
    return (this.saveManagers.get(name) || this.addNewManager(name)).status$;
  }

  onSave(name: string) {
    return this.saveManagers.get(name) || this.addNewManager(name);
  }

  private addNewManager(name: string) {
    const manager = this.createManager();
    this.saveManagers.set(name, manager);
    return manager;
  }

  private createManager(): PayloadManager<NewRecord, void> {
    return {
      payload$: new Subject(),
      status$: new Subject<void>(),
    };
  }
}
