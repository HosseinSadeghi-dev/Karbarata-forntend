import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
export interface ButtonData {
  url?: string
}
@Component({
  selector: 'button-table',
  templateUrl: './button-table.component.html',
  styleUrls: ['./button-table.component.scss']
})
export class ButtonTableComponent implements OnInit {
  @Input() isEdit: ButtonData;
  @Output() deleteEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onDelete() {
    this.deleteEvent.emit();
  }

}
