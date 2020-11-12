import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimpleRoutingModule } from './simple-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import {FormComponent} from './components';

import {
  ListComponent,
  MainComponent
} from './pages';
import { ButtonFormModule, ButtonCardModule, UserButtonModule, BottomSheetModule } from '@app/shared/components';
import { PipesModule } from '@app/shared/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FormComponent,
    MainComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    SimpleRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    PipesModule.forRoot(),
    ButtonFormModule,
    UserButtonModule,
    ButtonCardModule,
    BottomSheetModule
  ]
})
export class SimpleModule {}
