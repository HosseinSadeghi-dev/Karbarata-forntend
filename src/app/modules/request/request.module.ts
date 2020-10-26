import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "@app/shared/shared.module";
import {PipesModule} from "@app/shared/pipes/pipes.module";

import { RequestRoutingModule } from './request-routing.module';

import {
  MainComponent,
  SimpleComponent,
  MunicipalityComponent,
  PriceAdviceComponent
} from './pages';

import {
  DayCounterModule, ImageLazyModule
} from "@app/shared/components";


@NgModule({
  declarations: [
    MainComponent,
    SimpleComponent,
    MunicipalityComponent,
    PriceAdviceComponent,
  ],
  imports: [
    CommonModule,
    RequestRoutingModule,
    SharedModule,
    PipesModule,
    ReactiveFormsModule,
    DayCounterModule,
    ImageLazyModule,
  ]
})
export class RequestModule { }
