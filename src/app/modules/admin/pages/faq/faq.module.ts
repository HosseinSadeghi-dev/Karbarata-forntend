import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqRoutingModule } from './faq-routing.module';
import { SharedModule } from "@app/shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AccessorEditorModule} from '@app/shared/components';

import {
  MainComponent,
  ListComponent,
  FormComponent
} from './pages';
import {PipesModule} from '@app/shared/pipes/pipes.module';


@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    FaqRoutingModule,
    SharedModule,
    FormsModule,
    AccessorEditorModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class FaqModule { }
