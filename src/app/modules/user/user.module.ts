import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

import {
  ArticleFavoriteComponent,
  MainComponent,
  ProfileComponent
} from './pages';

import {SharedModule} from '@app/shared/shared.module';
import {ArticleFavoriteButtonModule, UserRoleChipModule} from '@app/shared/components';
import {PipesModule} from '@app/shared/pipes/pipes.module';


@NgModule({
  declarations: [
  MainComponent,
  ProfileComponent,
  ArticleFavoriteComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    UserRoleChipModule,
    ArticleFavoriteButtonModule,
    PipesModule
  ]
})
export class UserModule { }
