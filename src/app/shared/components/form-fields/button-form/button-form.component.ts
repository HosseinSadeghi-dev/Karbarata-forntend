import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'button-form',
  templateUrl: './button-form.component.html',
  styleUrls: ['./button-form.component.scss']
})
export class ButtonFormComponent implements OnInit {
  @Output() submitEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  @Input() isValid: boolean;
  @Input() prevUrl: string;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.submitEvent.emit();
  }
  onCancel(){
    this.cancelEvent.emit();
  }

}
