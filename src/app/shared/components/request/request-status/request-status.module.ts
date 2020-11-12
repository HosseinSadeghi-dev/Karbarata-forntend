import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestStatusComponent } from './request-status.component';
import {SharedModule} from "@app/shared/shared.module";
import {PipesModule} from "@app/shared/pipes/pipes.module";



@NgModule({
  declarations: [RequestStatusComponent],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule
  ]
})
export class RequestStatusModule { }
