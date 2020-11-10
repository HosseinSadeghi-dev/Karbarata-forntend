import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';

import {
  MainComponent,
  TransferComponent,
  ResultComponent
} from './pages';
import {SharedModule} from "../../shared/shared.module";


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
  ]
})
export class PaymentModule { }
