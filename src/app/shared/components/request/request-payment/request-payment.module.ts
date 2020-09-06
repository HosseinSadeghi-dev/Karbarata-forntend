import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestPaymentComponent } from './request-payment.component';
import {PipesModule} from "../../../pipes/pipes.module";
import {SharedModule} from "../../../shared.module";



@NgModule({
  declarations: [RequestPaymentComponent],
  imports: [
    CommonModule,
    PipesModule,
    SharedModule
  ]
})
export class RequestPaymentModule { }
