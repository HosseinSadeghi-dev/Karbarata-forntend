import {Component, Input, OnInit} from '@angular/core';
import {Helpers} from '@app/shared/helpers';

@Component({
  selector: 'image-lazy',
  templateUrl: './image-lazy.component.html',
  styleUrls: ['./image-lazy.component.scss']
})
export class ImageLazyComponent implements OnInit {
  public readonly helper = new Helpers();
  @Input() image: string;
  @Input() alt: string;
  @Input() classes: string;
  @Input() width: number;
  @Input() isUser: boolean;
  defaultImage = 'assets/image/image-loader.svg';

  constructor() { }

  ngOnInit(): void {
  }

}
