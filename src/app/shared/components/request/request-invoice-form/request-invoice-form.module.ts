import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestInvoiceFormComponent } from './request-invoice-form.component';
import {SharedModule} from "../../../shared.module";
import {PipesModule} from "../../../pipes/pipes.module";



@NgModule({
  declarations: [RequestInvoiceFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule
  ]
})
export class RequestInvoiceFormModule { }
