import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../../shared.module";
import {PipesModule} from "../../../pipes/pipes.module";
import {RequestReportDialogComponent} from "@app/shared/components/request/request-report-dialog/request-report-dialog.component";



@NgModule({
  declarations: [RequestReportDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule
  ]
})
export class RequestReportDialogModule { }
