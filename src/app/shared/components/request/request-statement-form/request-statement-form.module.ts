import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "@app/shared/shared.module";
import { RequestStatementFormComponent } from './request-statement-form.component';
import {PipesModule} from "../../../pipes/pipes.module";



@NgModule({
  declarations: [RequestStatementFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class RequestStatementFormModule { }
