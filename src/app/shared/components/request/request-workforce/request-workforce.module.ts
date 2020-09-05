import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestWorkforceComponent } from './request-workforce.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared.module";
import {PipesModule} from "../../../pipes/pipes.module";



@NgModule({
  declarations: [RequestWorkforceComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    PipesModule
  ]
})
export class RequestWorkforceModule { }
