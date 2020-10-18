import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';

import {
  MainComponent,
  TransferComponent,
  ResultComponent
} from './pages';
import {SharedModule} from "../../shared/shared.module";
import {PreloaderModule} from "../../shared/components";


@NgModule({
  declarations: [
    MainComponent,
    TransferComponent,
    ResultComponent,

  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedModule,
    PreloaderModule
  ]
})
export class PaymentModule { }
