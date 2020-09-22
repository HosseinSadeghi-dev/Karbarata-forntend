import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, Observable, of} from 'rxjs';
import {RequestSimpleContext} from "../../../../../../../core/models";
import {RequestService} from "../../../../../../../core/services";



export class RequestSimpleDatasource implements DataSource<RequestSimpleContext>{

  private requestSubject = new BehaviorSubject<RequestSimpleContext[]>([]);
  private _pageTotal;
  private _total;

  get pageTotal(): number{
    return this._pageTotal;
  }

  get total(): number{
    return this._total;
  }

  constructor(private requestService: RequestService){}

  loadRequests(
    filter:string,
    sortDirection:string,
    pageIndex:number,
    pageSize:number,
    verb?:string,
    data?:string) {
    this.requestService
      .findAllSimple(filter, sortDirection, pageIndex, pageSize, verb, data)
      .subscribe(value => this.handleRes(value));
  }
  handleRes(res){
    this.requestSubject.next(res.results);
    this._pageTotal = res.page_total;
    this._total = res.total;
  }

  connect(collectionViewer: CollectionViewer): Observable<RequestSimpleContext[]> {
    return this.requestSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.requestSubject.complete();
  }
}
