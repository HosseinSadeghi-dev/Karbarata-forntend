import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
export interface InputData {
  formControl: AbstractControl
}
@Component({
  selector: 'tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss']
})
export class TagInputComponent implements OnInit {
  @Input() data: InputData;
  @Input() label: string;

  constructor() { }

  ngOnInit(): void {
  }
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER];
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    const tagList = this.data.formControl.value;

    if ((value || '').trim()) {
      tagList.push( value.trim());
    }

    this.data.formControl.setValue(tagList);

    if (input) {
      input.value = '';
    }
  }

  remove(tag): void {
    const tagList = this.data.formControl.value;
    const index = tagList.indexOf(tag);

    if (index >= 0) {
      tagList.splice(index, 1);
    }
    this.data.formControl.setValue(tagList);
  }
}
