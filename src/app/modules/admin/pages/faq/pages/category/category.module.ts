import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "@app/shared/shared.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditorModule} from "@tinymce/tinymce-angular";
import { CategoryRoutingModule } from './category-routing.module';

import {
  ListComponent,
  MainComponent,
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
    SharedModule,
    EditorModule,
    CategoryRoutingModule,
    ReactiveFormsModule
  ]
})
export class CategoryModule { }
