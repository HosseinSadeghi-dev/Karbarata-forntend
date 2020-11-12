import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestInvoiceComponent } from './request-invoice.component';
import {SharedModule} from "../../../shared.module";
import {PipesModule} from "../../../pipes/pipes.module";
import {RouterModule} from "@angular/router";
import {RequestStatusStatementTableComponent} from "../..";



@NgModule({
    declarations: [RequestInvoiceComponent, RequestStatusStatementTableComponent],
    exports: [
        RequestStatusStatementTableComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PipesModule,
        RouterModule
    ]
})
export class RequestInvoiceModule { }
