import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-accessor-editor',
  templateUrl: './accessor-editor.component.html',
  styleUrls: ['./accessor-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AccessorEditorComponent),
      multi: true
    }
  ]
})
export class AccessorEditorComponent implements ControlValueAccessor {
  plugins = ['advlist autolink lists link image charmap print preview anchor directionality',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help wordcount'];
  toolbar = 'rtl | undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help';

  value: string;
  onChange: (x?) => void;
  onTouched: () => void;
  disabled: boolean;

  constructor() { }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: any): void {
    this.value = value ? value : '';
  }
}
