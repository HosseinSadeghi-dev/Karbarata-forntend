import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimpleRoutingModule } from './simple-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import {FormComponent} from './components';

import {
  ListComponent,
  MainComponent
} from './pages';



@NgModule({
  declarations: [
    FormComponent,
    MainComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    SimpleRoutingModule,
    SharedModule
  ]
})
export class SimpleModule { }
