import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonCardComponent } from './button-card.component';
import {SharedModule} from '../../../shared.module';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [ButtonCardComponent],
  exports: [ButtonCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class ButtonCardModule { }
