import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "@app/shared/shared.module";
import {PipesModule} from "@app/shared/pipes/pipes.module";
import {ReactiveFormsModule} from "@angular/forms";

import { MasterRoutingModule } from './master-routing.module';

import {
  MainComponent,
  CategoryComponent,
  SkillComponent,
  RequestComponent
} from './pages';
import {SkillShowModule} from "../../../../shared/components";


@NgModule({
  declarations: [
    MainComponent,
    CategoryComponent,
    SkillComponent,
    RequestComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    ReactiveFormsModule,
    MasterRoutingModule,
    SkillShowModule
  ]
})
export class MasterModule { }
