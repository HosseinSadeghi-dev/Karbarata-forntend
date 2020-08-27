import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "@app/shared/shared.module";
import {ButtonCardModule, UserButtonModule} from "@app/shared/components";
import { SimpleRoutingModule } from './simple-routing.module';

import {
  MainComponent,
  ListComponent,
  FormComponent
} from './pages';
import {PipesModule} from "../../../../../../shared/pipes/pipes.module";


@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    SimpleRoutingModule,
    SharedModule,
    ButtonCardModule,
    UserButtonModule,
    PipesModule
  ]
})
export class SimpleModule { }
