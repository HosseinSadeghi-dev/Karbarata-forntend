import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, Observable, of} from 'rxjs';

import {ArticleService} from "../../../../../../../core/services";
import {ArticleCategoryContext} from "../../../../../../../core/models";



export class ArticlesCategoryDataSource implements DataSource<ArticleCategoryContext>{

  private articlesSubject = new BehaviorSubject<ArticleCategoryContext[]>([]);
  private _pageTotal;
  private _total;

  get pageTotal(): number{
    return this._pageTotal;
  }

  get total(): number{
    return this._total;
  }

  constructor(private articleService: ArticleService){}

  loadCategories(filter:string,
               sortDirection:string,
               pageIndex:number,
               pageSize:number) {
    this.articleService
      .getArticleCategoryList(filter, sortDirection, pageIndex, pageSize)
      .subscribe(value => this.handleRes(value));
  }
  handleRes(res){
    this.articlesSubject.next(res.results);
    this._pageTotal = res.page_total;
    this._total = res.total;
  }

  connect(collectionViewer: CollectionViewer): Observable<ArticleCategoryContext[]> {
    return this.articlesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.articlesSubject.complete();
  }
}
