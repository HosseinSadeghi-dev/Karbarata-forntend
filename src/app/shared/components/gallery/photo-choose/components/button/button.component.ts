import {AfterViewChecked, ChangeDetectorRef, Component, forwardRef, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';

export interface InputData {
  formControl: FormGroup | FormArray,
  multiple?: boolean
}

@Component({
  selector: 'photo-choose-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class ButtonComponent implements AfterViewChecked{
  @Input() data: InputData;
  previewUrl: string = null;

  constructor(private cdr: ChangeDetectorRef){}
  ngAfterViewChecked(): void {
    if (!this.data.multiple){
      const id = this.data.formControl.get('id').value,
        name = this.data.formControl.get('name').value;
      if (id !== '' && name !== '')
        this.onChangeImage({
          id: this.data.formControl.get('id').value,
          name: this.data.formControl.get('name').value
        });
    }else {
      this.onChangeImage(this.data.formControl.value);
    }
    this.cdr.detectChanges();
  }

  onChangeImage(data){
    if (!this.data.multiple) {
      this.data.formControl.get('id').setValue(data.id);
      this.data.formControl.get('name').setValue(data.name);
      this.previewUrl = data.name ? `https://end.ratabit.com/api/upload/gallery/${data.name}` : null;
    }else {
      // const images: FormArray = this.data.formControl as FormArray;
      // data.map(x => {
      //   images.push(new FormControl(x));
      // });
      // console.log('run',this.data.formControl.value);
      this.data.formControl.setValue(data)
    }

  }
}
