import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportButtonComponent } from './support-button.component';
import {SharedModule} from "../../../shared.module";



@NgModule({
  declarations: [SupportButtonComponent],
  exports: [
    SupportButtonComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class SupportButtonModule { }
