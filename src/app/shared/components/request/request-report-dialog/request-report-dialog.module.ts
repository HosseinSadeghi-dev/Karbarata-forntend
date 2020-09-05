import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestReportDialogComponent } from './request-report-dialog.component';
import {SharedModule} from "../../../shared.module";
import {PipesModule} from "../../../pipes/pipes.module";



@NgModule({
  declarations: [RequestReportDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule
  ]
})
export class RequestReportDialogModule { }
