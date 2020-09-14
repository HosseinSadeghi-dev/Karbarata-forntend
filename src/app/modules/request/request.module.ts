import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "@app/shared/shared.module";
import {PipesModule} from "@app/shared/pipes/pipes.module";

import { RequestRoutingModule } from './request-routing.module';

import {
  MainComponent
} from './pages';
import { SimpleComponent } from './pages/simple/simple.component';
import { MasterComponent } from './pages/master/master.component';


@NgModule({
  declarations: [
    MainComponent,
    SimpleComponent,
    MasterComponent
  ],
  imports: [
    CommonModule,
    RequestRoutingModule,
    SharedModule,
    PipesModule,
    ReactiveFormsModule
  ]
})
export class RequestModule { }
