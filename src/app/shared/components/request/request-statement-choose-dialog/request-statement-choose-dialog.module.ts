import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestStatementChooseDialogComponent } from './request-statement-choose-dialog.component';
import {SharedModule} from "../../../shared.module";
import {PipesModule} from "../../../pipes/pipes.module";



@NgModule({
  declarations: [RequestStatementChooseDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule
  ]
})
export class RequestStatementChooseDialogModule { }
