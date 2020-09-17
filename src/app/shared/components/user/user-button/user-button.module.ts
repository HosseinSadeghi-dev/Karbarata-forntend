import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserButtonComponent } from './user-button.component';
import {SharedModule} from '../../../shared.module';
import {RouterModule} from '@angular/router';
import {PipesModule} from "../../../pipes/pipes.module";



@NgModule({
  declarations: [UserButtonComponent],
  exports: [
    UserButtonComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        PipesModule
    ]
})
export class UserButtonModule { }
