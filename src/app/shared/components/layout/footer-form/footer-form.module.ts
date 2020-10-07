import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterFormComponent } from './footer-form.component';
import {SharedModule} from "@app/shared/shared.module";
import {PipesModule} from "@app/shared/pipes/pipes.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    FooterFormComponent
  ],
  exports: [
    FooterFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    ReactiveFormsModule
  ]
})
export class FooterFormModule { }
