import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FavoriteDialogComponent} from './favorite-dialog.component';
import {SharedModule} from '../../../shared.module';
import {UserListItemModule} from '../..';



@NgModule({
  declarations: [FavoriteDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserListItemModule
  ],
  exports: [FavoriteDialogComponent]
})
export class FavoriteDialogModule { }
