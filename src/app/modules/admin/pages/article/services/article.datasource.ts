import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, Observable, of} from 'rxjs';
import {ArticleContext, ArticleStatus} from "@app/core/models";
import {ArticleService} from "@app/core/services";

export class ArticlesDataSource implements DataSource<ArticleContext>{

  private articlesSubject = new BehaviorSubject<ArticleContext[]>([]);
  private _pageTotal;
  private _total;

  get pageTotal(): number{
    return this._pageTotal;
  }

  get total(): number{
    return this._total;
  }

  constructor(private articleService: ArticleService){}

  loadArticles(
    filter: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number,
    verb?: string,
    data?: string) {
    this.articleService
      .getArticleList(filter, sortDirection, pageIndex, pageSize, verb, data)
      .subscribe(value => this.handleRes(value));
  }
  handleRes(res){
    this.articlesSubject.next(res.results.filter(article => article.status !== ArticleStatus.UNPUBLISHED));
    // this._pageTotal = res.page_total;
    this._total = res.total;
  }

  connect(collectionViewer?: CollectionViewer): Observable<ArticleContext[]> {
    return this.articlesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.articlesSubject.complete();
  }
}
