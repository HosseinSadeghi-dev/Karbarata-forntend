import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestInvoiceFormComponent } from './request-invoice-form.component';
import {SharedModule} from "../../../shared.module";
import {PipesModule} from "../../../pipes/pipes.module";
import {ReactiveFormsModule} from "@angular/forms";
import {RequestInvoiceModule} from "../..";



@NgModule({
  declarations: [RequestInvoiceFormComponent],
    imports: [
        CommonModule,
        SharedModule,
        PipesModule,
        ReactiveFormsModule,
        RequestInvoiceModule
    ]
})
export class RequestInvoiceFormModule { }
