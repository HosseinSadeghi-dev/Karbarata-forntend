import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RequestStatusPerDayComponent} from "./request-status-per-day.component";
import {SharedModule} from "../../../shared.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [RequestStatusPerDayComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class RequestStatusPerDayModule { }
