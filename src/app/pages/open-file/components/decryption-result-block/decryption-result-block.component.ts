import { Component, ChangeDetectionStrategy } from '@angular/core';
import { recordIdentify, RecordListItem } from 'src/app/pages/new-file/types/record-list-item.type';
import { DecryptionResultManagerService } from '../../services/decryption-result-manager.service';

@Component({
  selector: 'app-decryption-result-block',
  templateUrl: './decryption-result-block.component.html',
  styleUrls: ['./decryption-result-block.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DecryptionResultBlockComponent {
  records$ = this.drm.getDecryptedResult();
  constructor(private drm: DecryptionResultManagerService) {}

  recordTrackBy(index: number, record: RecordListItem) {
    return recordIdentify(record);
  }
}
