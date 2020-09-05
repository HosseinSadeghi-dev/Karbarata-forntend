import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RequestReportComponent} from "./request-report.component";
import {SharedModule} from "../../../shared.module";
import {PipesModule} from "../../../pipes/pipes.module";


@NgModule({
  declarations: [RequestReportComponent],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule
  ]
})
export class RequestReportModule { }
