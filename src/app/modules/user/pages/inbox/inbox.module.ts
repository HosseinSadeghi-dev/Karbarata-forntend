import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InboxRoutingModule } from './inbox-routing.module';

import {
  MainComponent,
  HomeComponent
} from './pages';


@NgModule({
  declarations: [MainComponent, HomeComponent],
  imports: [
    CommonModule,
    InboxRoutingModule
  ]
})
export class InboxModule { }
