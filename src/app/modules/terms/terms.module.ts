import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "@app/shared/shared.module";

import { TermsRoutingModule } from './terms-routing.module';
import {
  MainComponent,
  HomeComponent
} from './pages';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    TermsRoutingModule,
    SharedModule
  ]
})
export class TermsModule { }
