import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { SharedModule } from '@app/shared/shared.module';
import { UsersRoutingModule } from "./users-routing.module";
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from "@app/shared/pipes/pipes.module";

import {
  ListComponent,
  MainComponent,
  FormComponent
} from "./pages";

import {
  AccessorEditorModule,
  ArticleFavoriteButtonModule,
  PhotoChooseModule,
  TagInputModule,
  UserButtonModule,
  UserListItemModule
} from '@app/shared/components';

@NgModule({
  declarations: [
    ListComponent,
    MainComponent,
    FormComponent,

  ],
    imports: [
        CommonModule,
        SharedModule,
        ArticleFavoriteButtonModule,
        UserButtonModule,
        ReactiveFormsModule,
        PhotoChooseModule,
        UsersRoutingModule,
        UserListItemModule,
        TagInputModule,
        AccessorEditorModule,
        RouterModule,
        PipesModule
    ]
})
export class UsersModule { }
