import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '@app/shared/shared.module';
import {ArticleFavoriteButtonComponent} from './article-favorite-button.component';



@NgModule({
  declarations: [ArticleFavoriteButtonComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [ArticleFavoriteButtonComponent]
})
export class ArticleFavoriteButtonModule { }
