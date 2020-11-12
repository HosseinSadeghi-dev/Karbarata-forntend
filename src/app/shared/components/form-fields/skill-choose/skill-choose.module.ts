import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillChooseComponent } from './skill-choose.component';
import {SharedModule} from "../../../shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {PipesModule} from "../../../pipes/pipes.module";
import {BrowserModule} from "@angular/platform-browser";



@NgModule({
  declarations: [
    SkillChooseComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    ReactiveFormsModule,
    SharedModule,
    BrowserModule
  ],
  exports: [
    SkillChooseComponent
  ]
})
export class SkillChooseModule { }
