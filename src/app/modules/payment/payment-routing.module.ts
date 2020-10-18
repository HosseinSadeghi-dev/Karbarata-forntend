import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent, ResultComponent, TransferComponent} from "./pages";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'transfer/:refId',
    component: TransferComponent
  },
  {
    path: 'result/:paymentId',
    component: ResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
