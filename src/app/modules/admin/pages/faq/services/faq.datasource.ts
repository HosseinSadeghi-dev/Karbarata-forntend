import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, Observable, of} from 'rxjs';

import {FaqService} from "../../../../../core/services";
import {FaqContext} from "../../../../../core/models";


export class FaqDatasource implements DataSource<FaqContext>{

  private faqSubject = new BehaviorSubject<FaqContext[]>([]);
  private _pageTotal;
  private _total;

  get pageTotal(): number{
    return this._pageTotal;
  }

  get total(): number{
    return this._total;
  }

  constructor(private faqService: FaqService){}

  loadFaqs(
    filter:string,
    sortDirection:string,
    pageIndex:number,
    pageSize:number,
    verb?:string,
    data?:string) {
    this.faqService
      .findAllFaq(filter, sortDirection, pageIndex, pageSize, verb, data)
      .subscribe(value => this.handleRes(value));
  }
  handleRes(res){
    this.faqSubject.next(res.results);
    // this._pageTotal = res.page_total;
    this._total = res.total;
  }

  connect(collectionViewer?: CollectionViewer): Observable<FaqContext[]> {
    return this.faqSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.faqSubject.complete();
  }
}
