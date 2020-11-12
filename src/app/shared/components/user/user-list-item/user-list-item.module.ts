import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListItemComponent } from './user-list-item.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../../material/material.module';



@NgModule({
  declarations: [UserListItemComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [UserListItemComponent]
})
export class UserListItemModule { }
