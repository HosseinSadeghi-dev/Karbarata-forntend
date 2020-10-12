import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from './star-rating.component';
import {SharedModule} from "@app/shared/shared.module";



@NgModule({
  declarations: [StarRatingComponent],
  exports: [
    StarRatingComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class StarRatingModule { }
