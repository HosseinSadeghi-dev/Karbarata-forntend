import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "@app/shared/shared.module";
import {PipesModule} from "@app/shared/pipes/pipes.module";
import {ButtonCardModule, DayCounterModule, UserButtonModule} from "@app/shared/components";
import { SimpleRoutingModule } from './simple-routing.module';

import {
  MainComponent,
  ListComponent,
  FormComponent,
  ShowComponent
} from './pages';

import {
  RequestCostComponent
} from "./containers";
import { RequestWorkforceComponent } from './containers/request-workforce/request-workforce.component';


@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    FormComponent,
    ShowComponent,
    RequestCostComponent,
    RequestWorkforceComponent,
  ],
  imports: [
    CommonModule,
    SimpleRoutingModule,
    SharedModule,
    ButtonCardModule,
    UserButtonModule,
    PipesModule,
    ReactiveFormsModule,
    DayCounterModule
  ]
})
export class SimpleModule { }
