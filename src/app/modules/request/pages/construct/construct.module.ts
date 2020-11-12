import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "@app/shared/shared.module";
import {PipesModule} from "@app/shared/pipes/pipes.module";
import {SkillShowModule} from "@app/shared/components";

import { ConstructRoutingModule } from './construct-routing.module';

import {
  MainComponent,
  CategoryComponent,
  RequestComponent
} from './pages';


@NgModule({
  declarations: [
    MainComponent,
    CategoryComponent,
    RequestComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    ReactiveFormsModule,
    ConstructRoutingModule,
    SkillShowModule
  ]
})
export class ConstructModule { }
