import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonTableComponent } from './button-table.component';
import {SharedModule} from '../../../shared.module';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [ButtonTableComponent],
  exports: [ButtonTableComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class ButtonTableModule { }
