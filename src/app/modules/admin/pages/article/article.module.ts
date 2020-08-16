import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { ArticleRoutingModule } from './article-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import {
  AccessorEditorModule,
  ArticleFavoriteButtonModule,
  PhotoChooseModule,
  TagInputModule,
  UserButtonModule,
  UserListItemModule
} from '@app/shared/components';

import {
  FormComponent,
  ListComponent,
  MainComponent
} from './pages';

import {
  FavoriteListDialogComponent,
  TagListDialogComponent
} from './components';



@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    FormComponent,
    FavoriteListDialogComponent,
    TagListDialogComponent
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    SharedModule,
    ArticleFavoriteButtonModule,
    UserButtonModule,
    ReactiveFormsModule,
    PhotoChooseModule,
    UserListItemModule,
    TagInputModule,
    AccessorEditorModule
  ]
})
export class ArticleModule { }
