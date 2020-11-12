import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteButtonComponent } from './favorite-button.component';
import {MaterialModule} from '../../../material/material.module';



@NgModule({
  declarations: [FavoriteButtonComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [FavoriteButtonComponent]
})
export class FavoriteButtonModule { }
