import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';

import {
  MainComponent,
  ListComponent,
} from './pages';
import { FormComponent } from './pages/form/form.component';
import {SharedModule} from "../../../../../../shared/shared.module";
import {ButtonCardModule, UserButtonModule} from "../../../../../../shared/components";
import {PipesModule} from "../../../../../../shared/pipes/pipes.module";


@NgModule({
  declarations: [MainComponent, ListComponent, FormComponent],
  imports: [
    CommonModule,
    MasterRoutingModule,
    SharedModule,
    ButtonCardModule,
    UserButtonModule,
    PipesModule
  ]
})
export class MasterModule { }
