import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'content-preview',
  templateUrl: './content-preview.component.html',
  styleUrls: ['./content-preview.component.scss']
})
export class ContentPreviewComponent implements OnInit {

  @Input() data: any;
  @Input() prefix: string;

  constructor() { }

  ngOnInit(): void {
  }

}
