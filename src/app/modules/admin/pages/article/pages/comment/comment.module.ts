import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '@app/shared/shared.module';
import {UserButtonModule} from '@app/shared/components';
import { CommentRoutingModule } from './comment-routing.module';
import {ReactiveFormsModule} from '@angular/forms';

import {
  ListComponent,
  MainComponent
} from './pages';

import {
  ReplyDialogComponent,
  ReplyCardComponent
} from './components';

import {
  ReplyFormComponent
} from './containers';


@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    ReplyDialogComponent,
    ReplyFormComponent,
    ReplyCardComponent
  ],
  imports: [
    CommonModule,
    CommentRoutingModule,
    SharedModule,
    UserButtonModule,
    ReactiveFormsModule
  ]
})
export class CommentModule { }
