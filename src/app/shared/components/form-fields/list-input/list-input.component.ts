import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';
export interface InputData {
  formControl: AbstractControl
}
@Component({
  selector: 'list-input',
  templateUrl: './list-input.component.html',
  styleUrls: ['./list-input.component.scss']
})
export class ListInputComponent implements OnInit {
  @Input() data: InputData;
  @Input() label: string;

  constructor() { }

  ngOnInit(): void {
  }

  add(e){
    const data = this.data.formControl.value;
    const value = e;
    if ((value || '').trim()) {
      data.push( value.trim());
    }
    this.data.formControl.setValue(data);
  }
  remove(res){
    const data = this.data.formControl.value;
    const index = data.indexOf(res);
    if (index >= 0) {
      data.splice(index, 1);
    }
    this.data.formControl.setValue(data);
  }

}
