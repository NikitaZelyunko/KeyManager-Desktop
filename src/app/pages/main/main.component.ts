import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RadioGroupVariant } from 'src/app/shared/components/radio-group/radio-group-variant';

type StartModeResult = 'new' | 'open' | 'edit';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  startMode: StartModeResult = 'new';

  readonly startModeVariants: RadioGroupVariant<StartModeResult>[] = [
    {
      label: 'New',
      value: 'new',
      checked: false,
    },
    {
      label: 'Open',
      value: 'open',
      checked: false,
    },
    {
      label: 'Edit',
      value: 'edit',
      checked: false,
    },
  ];

  startModeChange(value: StartModeResult) {
    this.startMode = value;
    this.router.navigate([value], { relativeTo: this.route });
  }

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const currentStartMode = (this.route.snapshot.firstChild?.url[0].path ||
      'new') as StartModeResult;
    this.startMode = currentStartMode;
  }
}
