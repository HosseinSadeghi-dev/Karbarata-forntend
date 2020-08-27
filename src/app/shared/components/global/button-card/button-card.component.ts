import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
export interface ButtonData {
  label?: string,
  icon?: string,
  url?: string
}
@Component({
  selector: 'button-card',
  templateUrl: './button-card.component.html',
  styleUrls: ['./button-card.component.scss']
})
export class ButtonCardComponent implements OnInit {
  @Output() reloadEvent = new EventEmitter();
  @Input() data: ButtonData[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onReload(){
    this.reloadEvent.emit()
  }

  sss(){
    console.log("ok");

  }

}
