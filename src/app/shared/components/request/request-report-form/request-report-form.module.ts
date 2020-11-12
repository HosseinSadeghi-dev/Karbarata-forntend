import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestReportFormComponent } from './request-report-form.component';
import {SharedModule} from "../../../shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {PipesModule} from "../../../pipes/pipes.module";



@NgModule({
  declarations: [RequestReportFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class RequestReportFormModule { }
