import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StartModeResult } from './components/start-mode-block/types/start-mode-result';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  startMode: StartModeResult = 'new';

  startModeChange(value: StartModeResult) {
    this.startMode = value;
    this.router.navigate([value], { relativeTo: this.route });
  }

  constructor(private router: Router, private route: ActivatedRoute) {}
}
