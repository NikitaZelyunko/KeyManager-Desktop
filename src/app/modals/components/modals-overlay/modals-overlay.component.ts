import {
  Component,
  ChangeDetectionStrategy,
  ViewContainerRef,
  OnDestroy,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ModalsService } from '../../services/modal.service';
import { ModalComponent } from '../../types/modal-component';
import { MarkedModal } from '../../types/service-modal';

@Component({
  selector: 'app-modals-overlay',
  templateUrl: './modals-overlay.component.html',
  styleUrls: ['./modals-overlay.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalsOverlayComponent implements AfterViewInit, OnDestroy {
  private unsubscriber$ = new Subject();

  currentShowingModal: MarkedModal | null = null;

  @ViewChild('modalContainer', { read: ViewContainerRef }) modalContainer!: ViewContainerRef;

  constructor(private modalsService: ModalsService) {}

  ngAfterViewInit(): void {
    this.modalsService
      .getActiveModal()
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe((markedModal) => {
        const modal = markedModal.modal;
        if (markedModal.id === this.currentShowingModal?.id) {
          return;
        }
        this.modalContainer.clear();
        const componentRef = this.modalContainer.createComponent<ModalComponent<typeof modal.data>>(
          modal.component
        );
        componentRef.instance.onDataChange(modal.data);
        this.currentShowingModal = markedModal;
      });
  }

  ngOnDestroy(): void {
    this.unsubscriber$.complete();
  }
}
