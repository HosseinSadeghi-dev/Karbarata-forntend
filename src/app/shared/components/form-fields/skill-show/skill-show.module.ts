import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillShowComponent } from './skill-show.component';
import {SharedModule} from "../../../shared.module";
import {PipesModule} from "../../../pipes/pipes.module";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    SkillShowComponent
  ],
  exports: [
    SkillShowComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    RouterModule
  ]
})
export class SkillShowModule { }
