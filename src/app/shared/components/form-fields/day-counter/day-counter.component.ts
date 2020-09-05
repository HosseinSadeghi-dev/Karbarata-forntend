import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-day-counter',
  templateUrl: './day-counter.component.html',
  styleUrls: ['./day-counter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DayCounterComponent),
      multi: true
    }
  ]
})
export class DayCounterComponent implements ControlValueAccessor {

  @Input() type: string;
  data: number;
  onChange: (data: any) => void;
  onTouched: (data: any) => void;
  disabled: boolean;

  constructor() { }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: number): void {
    this.data = value? value : 0;
  }

}
