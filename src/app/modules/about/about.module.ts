import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import {SharedModule} from "../../shared/shared.module";
import {PipesModule} from "../../shared/pipes/pipes.module";
import {ReactiveFormsModule} from "@angular/forms";

import {
  MainComponent,
  HomeComponent,
  CooperationComponent
} from "./pages";

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    CooperationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    ReactiveFormsModule,
    AboutRoutingModule
  ]
})
export class AboutModule { }
