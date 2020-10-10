import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, Observable, of} from 'rxjs';
import {NewsContext} from "../../../../../core/models";
import {NewsService} from "../../../../../core/services";



export class NewsDataSource implements DataSource<NewsContext>{

  private newsSubject = new BehaviorSubject<NewsContext[]>([]);
  private _pageTotal;
  private _total;

  get pageTotal(): number{
    return this._pageTotal;
  }

  get total(): number{
    return this._total;
  }

  constructor(private newsService: NewsService){}

  loadNews(
    filter:string,
    sortDirection:string,
    pageIndex:number,
    pageSize:number) {
    this.newsService
      .findAllNews(filter, sortDirection, pageIndex, pageSize)
      .subscribe(value => this.handleRes(value));
  }
  handleRes(res){
    this.newsSubject.next(res.results);
    // this._pageTotal = res.page_total;
    this._total = res.total;
  }

  connect(collectionViewer: CollectionViewer): Observable<NewsContext[]> {
    return this.newsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.newsSubject.complete();
  }
}
