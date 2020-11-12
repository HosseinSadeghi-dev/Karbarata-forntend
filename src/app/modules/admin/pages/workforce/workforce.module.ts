import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkforceRoutingModule } from './workforce-routing.module';
import {MainComponent} from './pages';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    WorkforceRoutingModule
  ]
})
export class WorkforceModule { }
