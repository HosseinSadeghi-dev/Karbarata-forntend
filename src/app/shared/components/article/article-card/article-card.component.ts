import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ArticleContext, UserRole} from '@app/core/models';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {

  @Input() isFavoriteList: boolean;
  @Input() data: ArticleContext;
  @Output() private articleUpdated = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
  updateArticle(e){
    this.data = e;
    this.isFavoriteList && (this.articleUpdated.emit(true));
  }
  public get UserRole(){
    return UserRole;
  }
}
