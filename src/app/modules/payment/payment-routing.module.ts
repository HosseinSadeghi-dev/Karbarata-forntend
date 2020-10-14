import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent, TransferComponent} from "./pages";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'transfer',
        component: TransferComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
