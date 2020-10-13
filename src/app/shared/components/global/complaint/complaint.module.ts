import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintComponent } from './complaint.component';
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from '../../../shared.module';
import {PipesModule} from "@app/shared/pipes/pipes.module";
import {StarRatingModule} from "@app/shared/components/form-fields/star-rating/star-rating.module";

@NgModule({
  declarations: [ComplaintComponent],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    ReactiveFormsModule,
    StarRatingModule,
  ]
})
export class ComplaintModule { }
