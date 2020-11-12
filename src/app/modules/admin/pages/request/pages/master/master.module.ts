import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "@app/shared/shared.module";
import {ButtonCardModule, UserButtonModule} from "@app/shared/components";
import {PipesModule} from "@app/shared/pipes/pipes.module";
import {ReactiveFormsModule} from "@angular/forms";
import { MasterRoutingModule } from './master-routing.module';

import {
  MainComponent,
  ListComponent,
  FormComponent,
  ShowComponent,
} from './pages';
import {WorkforceMasterComponent} from "./containers";


@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    FormComponent,
    ShowComponent,
    WorkforceMasterComponent
  ],
    imports: [
        CommonModule,
        MasterRoutingModule,
        SharedModule,
        ButtonCardModule,
        UserButtonModule,
        PipesModule,
        ReactiveFormsModule
    ]
})
export class MasterModule { }
