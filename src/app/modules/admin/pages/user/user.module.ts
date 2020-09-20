import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { SharedModule } from '@app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from "@app/shared/pipes/pipes.module";
import {UserRoutingModule} from './user-routing.module';

import {
  ListComponent,
  MainComponent,
  FormComponent
} from "./pages";

import {
    AccessorEditorModule,
    ArticleFavoriteButtonModule, ButtonCardModule,
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
        UserRoutingModule,
        UserListItemModule,
        TagInputModule,
        AccessorEditorModule,
        RouterModule,
        PipesModule,
        ButtonCardModule
    ]
})
export class UserModule { }
