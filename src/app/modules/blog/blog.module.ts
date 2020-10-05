import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';
import {HomeComponent, MainComponent, ShowComponent} from './pages';
import {SharedModule} from '../../shared/shared.module';

import {
  ArticleFavoriteButtonModule,
  ContentPreviewModule,
  ImageLazyModule,
  UserListItemModule,
  UserRoleChipModule
} from '../../shared/components';

import {
  CommentFormComponent,
  CommentListComponent
} from './components';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PipesModule} from "../../shared/pipes/pipes.module";


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    ShowComponent,
    CommentListComponent,
    CommentFormComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    ArticleFavoriteButtonModule,
    UserListItemModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoleChipModule,
    ImageLazyModule,
    ContentPreviewModule,
    PipesModule
  ]
})
export class BlogModule { }
