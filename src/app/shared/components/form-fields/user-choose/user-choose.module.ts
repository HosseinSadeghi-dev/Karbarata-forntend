import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserChooseComponent } from './user-choose.component';
import {SharedModule} from "@app/shared/shared.module";



@NgModule({
  declarations: [
    UserChooseComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UserChooseModule { }
