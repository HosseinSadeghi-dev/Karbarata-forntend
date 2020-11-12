import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserChooseComponent } from './user-choose.component';
import {SharedModule} from "@app/shared/shared.module";
import {PipesModule} from "../../../pipes/pipes.module";



@NgModule({
  declarations: [
    UserChooseComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        PipesModule
    ]
})
export class UserChooseModule { }
