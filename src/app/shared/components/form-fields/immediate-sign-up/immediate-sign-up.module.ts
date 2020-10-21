import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImmediateSignUpComponent } from './immediate-sign-up.component';
import {SharedModule} from "@app/shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ImmediateSignUpComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ImmediateSignUpModule { }
