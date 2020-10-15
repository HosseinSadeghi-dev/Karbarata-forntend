import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '@app/shared/shared.module';
import {PipesModule} from "@app/shared/pipes/pipes.module";
import {RequestInvoiceModule} from "@app/shared/components";

import { InboxRoutingModule } from './inbox-routing.module';

import {
  MainComponent,
  HomeComponent,
  PayComponent
} from './pages';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    PayComponent,
  ],
  imports: [
    CommonModule,
    InboxRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    PipesModule,
    RequestInvoiceModule
  ]
})
export class InboxModule { }
