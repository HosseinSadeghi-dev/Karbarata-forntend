import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCardComponent } from './article-card.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '@app/shared/shared.module';
import {ArticleFavoriteButtonModule} from '../..';
// import {ArticleFavoriteButtonModule} from '@app/shared/components';



@NgModule({
  declarations: [ArticleCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ArticleFavoriteButtonModule
  ],
  exports: [ArticleCardComponent]
})
export class ArticleCardModule { }
