import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestStatementDialogComponent } from './request-statement-dialog.component';
import {SharedModule} from "../../../shared.module";
import {PipesModule} from "../../../pipes/pipes.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [RequestStatementDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    ReactiveFormsModule
  ]
})
export class RequestStatementDialogModule { }
