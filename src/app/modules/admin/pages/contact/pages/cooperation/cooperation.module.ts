import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CooperationRoutingModule} from "./cooperation-routing.module";
import {SharedModule} from '@app/shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';

import {
  ListComponent,
  MainComponent
} from "./pages";


@NgModule({
  declarations: [
    MainComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    CooperationRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CooperationModule { }
