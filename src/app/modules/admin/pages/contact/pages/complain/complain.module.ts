import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplainRoutingModule } from './complain-routing.module';
import {SharedModule} from '@app/shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';

import {
  ListComponent,
  MainComponent
} from "./pages";


@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    ComplainRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ComplainModule { }
