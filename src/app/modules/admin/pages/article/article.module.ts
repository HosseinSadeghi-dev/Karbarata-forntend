import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { ArticleRoutingModule } from './article-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import {
  AccessorEditorModule,
  PhotoChooseModule,
  TagInputModule,
  UserButtonModule,
  UserListItemModule,
  ArticleFavoriteButtonModule,
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
import {PipesModule} from "../../../../shared/pipes/pipes.module";



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
        UserButtonModule,
        ReactiveFormsModule,
        PhotoChooseModule,
        UserListItemModule,
        TagInputModule,
        AccessorEditorModule,
        PipesModule,
        ArticleFavoriteButtonModule,
    ]
})
export class ArticleModule { }
