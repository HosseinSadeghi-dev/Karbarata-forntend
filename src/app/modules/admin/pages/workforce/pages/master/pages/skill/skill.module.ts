import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillRoutingModule } from './skill-routing.module';
import {SharedModule} from '@app/shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {PipesModule} from '@app/shared/pipes/pipes.module';

import {
  FormComponent,
  ListComponent,
  MainComponent} from './pages';

import {
  ButtonCardModule,
  ButtonFormModule,
  ButtonTableModule,
  ImageLazyModule,
  ListInputModule,
  PhotoChooseModule,
  TagInputModule
} from '@app/shared/components';

@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    FormComponent

  ],
  imports: [
    CommonModule,
    SkillRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    PhotoChooseModule,
    TagInputModule,
    ListInputModule,
    ListInputModule,
    ButtonFormModule,
    ButtonTableModule,
    ButtonCardModule,
    ImageLazyModule,
    PipesModule
  ]
})
export class SkillModule { }
