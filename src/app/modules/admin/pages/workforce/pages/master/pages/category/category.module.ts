import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import {SharedModule} from '@app/shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {PipesModule} from '@app/shared/pipes/pipes.module';

import {
  ButtonCardModule,
  ButtonFormModule,
  ButtonTableModule, ImageLazyModule,
  PhotoChooseModule
} from '@app/shared/components';

import {
  FormComponent
} from './components';

import {
  ListComponent,
  MainComponent
} from './pages';




@NgModule({
  declarations: [
    MainComponent,
    FormComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule,
    PhotoChooseModule,
    ReactiveFormsModule,
    ButtonTableModule,
    ButtonFormModule,
    PipesModule,
    ButtonCardModule,
    ImageLazyModule
  ]
})
export class CategoryModule { }
