import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { StartModeResult } from './types/start-mode-result';

interface RadioVariant {
  label: string;
  value: StartModeResult;
}

@Component({
  selector: 'app-start-mode-block',
  templateUrl: './start-mode-block.component.html',
  styleUrls: ['./start-mode-block.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartModeBlockComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  @Input()
  set value(value: StartModeResult) {
    this.form.controls['mode'].setValue(value);
  }

  @Output() valueChange = new EventEmitter<StartModeResult>();

  readonly variants: RadioVariant[] = [
    {
      label: 'New',
      value: 'new',
    },
    {
      label: 'Open',
      value: 'open',
    },
    {
      label: 'Edit',
      value: 'edit',
    },
  ];

  form = this.fb.group({
    mode: this.fb.control(null, Validators.required),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.controls['mode'].valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value: StartModeResult) => this.valueChange.emit(value));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
  }
}
