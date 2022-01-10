import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FilterResultType } from 'src/app/records/types/filter-result-type';
import { recordIdentify, RecordListItem } from 'src/app/records/types/record-list-item.type';
import { DecryptionResultManagerService } from '../../services/decryption-result-manager.service';

@Component({
  selector: 'app-decryption-result-block',
  templateUrl: './decryption-result-block.component.html',
  styleUrls: ['./decryption-result-block.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DecryptionResultBlockComponent {
  records$ = this.drm.getDecryptedResult();
  filterResult: FilterResultType | null = null;
  constructor(private drm: DecryptionResultManagerService) {}

  recordTrackBy(index: number, record: RecordListItem) {
    return recordIdentify(record);
  }
}
