import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {

  @Input() rating: number = 0;
  @Input() readOnly: boolean = false;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

  inputName: string;
  ngOnInit() {
  }

  onClick(rating: number): void {
    this.rating = rating;
    this.ratingClick.emit({
      rating: rating
    });
  }
}
