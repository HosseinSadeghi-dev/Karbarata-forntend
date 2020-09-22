import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConstructRoutingModule } from './construct-routing.module';

import {
  FormComponent,
  ListComponent,
  MainComponent,
  ShowComponent
} from "./pages";
import {SharedModule} from "../../../../../../shared/shared.module";
import {ButtonCardModule, UserButtonModule} from "../../../../../../shared/components";
import {PipesModule} from "../../../../../../shared/pipes/pipes.module";


@NgModule({
  declarations: [
    MainComponent,
    FormComponent,
    ListComponent,
    ShowComponent
  ],
  imports: [
    CommonModule,
    ConstructRoutingModule,
    SharedModule,
    ButtonCardModule,
    UserButtonModule,
    PipesModule
  ]
})
export class ConstructModule { }
