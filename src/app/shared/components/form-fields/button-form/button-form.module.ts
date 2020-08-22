import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonFormComponent } from './button-form.component';
import {SharedModule} from '../../../shared.module';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [ButtonFormComponent],
  exports: [ButtonFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class ButtonFormModule { }
