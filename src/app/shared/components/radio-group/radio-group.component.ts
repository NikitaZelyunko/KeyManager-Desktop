import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { RadioGroupVariant } from './radio-group-variant';

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupComponent<V> {
  @Input() variants: RadioGroupVariant<V>[] = [];
  @Input()
  set value(value: V) {
    const installVariant = this.variants.find((variant) => variant.value === value);
    if (installVariant) {
      this.setCheckedVariant(installVariant);
    }
  }

  @Output() valueChange = new EventEmitter<V>();

  private checkedVariant: RadioGroupVariant<V> | null = null;

  onInput(variant: RadioGroupVariant<V>) {
    this.setCheckedVariant(variant);
    this.valueChange.emit(variant.value);
  }

  resetCheckedVariant() {
    if (this.checkedVariant) {
      this.checkedVariant.checked = false;
      this.checkedVariant = null;
    }
  }

  setCheckedVariant(variant: RadioGroupVariant<V>) {
    this.resetCheckedVariant();
    variant.checked = true;
    this.checkedVariant = variant;
  }
}
