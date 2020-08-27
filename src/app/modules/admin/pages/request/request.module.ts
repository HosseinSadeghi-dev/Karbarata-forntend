import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestRoutingModule } from './request-routing.module';
import {SharedModule} from "@app/shared/shared.module";

import {
  MainComponent,
  ListComponent,
} from './pages';
import {UserButtonModule} from "../../../../shared/components";
import {PipesModule} from "../../../../shared/pipes/pipes.module";

@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    RequestRoutingModule,
    SharedModule,
    UserButtonModule,
    PipesModule,

  ]
})
export class RequestModule { }
