import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListInputComponent } from './list-input.component';
import {SharedModule} from '../../../shared.module';



@NgModule({
  declarations: [ListInputComponent],
  exports: [ListInputComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ListInputModule { }
