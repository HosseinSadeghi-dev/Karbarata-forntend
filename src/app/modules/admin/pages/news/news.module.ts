import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { NewsRoutingModule } from './news-routing.module';
import {SharedModule} from '@app/shared/shared.module';

import {
  FormComponent,
  ListComponent,
  MainComponent
} from './pages';

import {
  AccessorEditorModule,
  PhotoChooseModule,
  TagInputModule,
  UserButtonModule
} from '@app/shared/components';

@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    AccessorEditorModule,
    PhotoChooseModule,
    TagInputModule,
    UserButtonModule
  ]
})
export class NewsModule { }
