import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import {
  FormComponent,
  ListComponent,
  MainComponent
} from './pages';
import {ReactiveFormsModule} from '@angular/forms';
import {PipesModule} from '@app/shared/pipes/pipes.module';
import {ButtonFormModule, UserButtonModule, ButtonCardModule} from '@app/shared/components';


@NgModule({
  declarations: [
    FormComponent,
    MainComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    PipesModule,
    ButtonFormModule,
    UserButtonModule,
    ButtonCardModule
  ]
})
export class MasterModule { }
