import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintComponent } from './complaint.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from '../../../shared.module';
import {PipesModule} from "@app/shared/pipes/pipes.module";

@NgModule({
  declarations: [ComplaintComponent],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    ReactiveFormsModule,
  ]
})
export class ComplaintModule { }
