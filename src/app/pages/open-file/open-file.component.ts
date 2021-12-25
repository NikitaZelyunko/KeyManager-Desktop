import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-open-file',
  templateUrl: './open-file.component.html',
  styleUrls: ['./open-file.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenFileComponent {
  constructor() {}
}
