import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogSupportButtonComponent } from './dialog-support-button.component';
import {SharedModule} from "../../../shared.module";
import {PipesModule} from "../../../pipes/pipes.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [DialogSupportButtonComponent],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DialogSupportButtonModule { }
