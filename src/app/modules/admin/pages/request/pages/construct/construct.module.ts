import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import { ConstructRoutingModule } from './construct-routing.module';
import {SharedModule} from "@app/shared/shared.module";
import {ButtonCardModule, UserButtonModule} from "@app/shared/components";
import {PipesModule} from "@app/shared/pipes/pipes.module";

import {
  FormComponent,
  ListComponent,
  MainComponent,
  ShowComponent
} from "./pages";

import {
  WorkforceConstructComponent
} from './containers';


@NgModule({
  declarations: [
    MainComponent,
    FormComponent,
    ListComponent,
    ShowComponent,
    WorkforceConstructComponent
  ],
    imports: [
        CommonModule,
        ConstructRoutingModule,
        SharedModule,
        ButtonCardModule,
        UserButtonModule,
        PipesModule,
        ReactiveFormsModule
    ]
})
export class ConstructModule { }
