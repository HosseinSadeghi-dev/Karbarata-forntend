import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "@app/shared/shared.module";
import {PipesModule} from "@app/shared/pipes/pipes.module";
import { ConstructRoutingModule } from './construct-routing.module';

import {
  FormComponent,
  ListComponent,
  MainComponent
} from './pages';
import {
  AccessorEditorModule,
  ButtonCardModule,
  ButtonFormModule,
  ImageLazyModule,
  ListInputModule,
  PhotoChooseModule,
  TagInputModule
} from "../../../../shared/components";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ConstructRoutingModule,
    SharedModule,
    PipesModule,
    ListInputModule,
    PhotoChooseModule,
    TagInputModule,
    ReactiveFormsModule,
    ButtonFormModule,
    ImageLazyModule,
    ButtonCardModule,
    AccessorEditorModule
  ]
})
export class ConstructModule { }
