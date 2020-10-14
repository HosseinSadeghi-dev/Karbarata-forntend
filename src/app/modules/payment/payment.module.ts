import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';

import {
  MainComponent,
  TransferComponent
} from './pages';


@NgModule({
  declarations: [
    MainComponent,
    TransferComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule
  ]
})
export class PaymentModule { }
