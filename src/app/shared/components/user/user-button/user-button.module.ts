import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserButtonComponent } from './user-button.component';
import {SharedModule} from '../../../shared.module';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [UserButtonComponent],
  exports: [
    UserButtonComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class UserButtonModule { }
