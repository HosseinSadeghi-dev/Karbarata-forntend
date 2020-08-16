import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '@app/shared/shared.module';
import { CategoryRoutingModule } from './category-routing.module';
import {ReactiveFormsModule} from '@angular/forms';

import {
  ListComponent,
  MainComponent
} from './pages';

import {
  FormComponent
} from './components';


@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CategoryModule { }
