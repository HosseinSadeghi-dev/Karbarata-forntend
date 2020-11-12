import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "@app/shared/shared.module";
import { PipesModule } from "@app/shared/pipes/pipes.module";

import { FaqRoutingModule } from './faq-routing.module';

import {
  MainComponent,
  HomeComponent
} from './pages'

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    FaqRoutingModule
  ]
})
export class FaqModule { }
