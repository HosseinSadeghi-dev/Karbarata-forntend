import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestStatementComponent } from './request-statement.component';
import { PipesModule } from "@app/shared/pipes/pipes.module";
import { SharedModule } from "@app/shared/shared.module";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [RequestStatementComponent],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    RouterModule,
  ]
})
export class RequestStatementModule { }
