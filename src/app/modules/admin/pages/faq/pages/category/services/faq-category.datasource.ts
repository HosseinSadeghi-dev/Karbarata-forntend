import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, Observable, of} from 'rxjs';

import {FaqCategoryContext} from "../../../../../../../core/models";
import {FaqService} from "../../../../../../../core/services";


export class FaqCategoryDatasource implements DataSource<FaqCategoryContext>{

  private faqSubject = new BehaviorSubject<FaqCategoryContext[]>([]);
  private _pageTotal;
  private _total;

  get pageTotal(): number{
    return this._pageTotal;
  }

  get total(): number{
    return this._total;
  }

  constructor(private faqService: FaqService){}

  loadCategories(
    filter:string,
    sortDirection:string,
    pageIndex:number,
    pageSize:number,
    verb?:string,
    data?:string) {
    this.faqService
      .findAllFaqCategory(filter, sortDirection, pageIndex, pageSize, verb, data)
      .subscribe(value => this.handleRes(value));
  }
  handleRes(res){
    this.faqSubject.next(res.results);
    this._pageTotal = res.page_total;
    this._total = res.total;
  }

  connect(collectionViewer: CollectionViewer): Observable<FaqCategoryContext[]> {
    return this.faqSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.faqSubject.complete();
  }
}
