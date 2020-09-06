import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestInvoiceComponent } from './request-invoice.component';
import {SharedModule} from "../../../shared.module";
import {PipesModule} from "../../../pipes/pipes.module";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [RequestInvoiceComponent],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    RouterModule
  ]
})
export class RequestInvoiceModule { }
