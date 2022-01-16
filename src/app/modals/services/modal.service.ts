import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, first, map, switchMap, tap } from 'rxjs';
import { BaseModal } from '../types/base-modal';
import { MarkedModal } from '../types/service-modal';

@Injectable()
export class ModalsService {
  private modals$ = new BehaviorSubject<MarkedModal[]>([]);
  private id = 0;

  getActiveModals() {
    return this.modals$.asObservable();
  }

  getLatestActiveModals() {
    return this.getActiveModals().pipe(first());
  }

  getActiveModal() {
    return this.getActiveModals().pipe(
      map((modals) => modals[0]),
      filter(Boolean)
    );
  }

  open(modal: BaseModal) {
    return this.getLatestActiveModals().pipe(
      tap((modals) => {
        modals.push({ id: this.id++, modal });
        this.modals$.next(modals);
      }),
      switchMap(() => combineLatest([this.getLatestActiveModals(), modal.onClose$])),
      tap(([modals]) => {
        const modalIndex = modals.findIndex((item) => item.modal === modal);
        if (modalIndex !== -1) {
          modals.splice(modalIndex, 1);
          this.modals$.next(modals);
        }
      })
    );
  }
}
