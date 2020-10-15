import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, Observable} from 'rxjs';
import { RequestContext} from "@app/core/models";
import {UserRequestService} from "@app/core/services";


export class InboxDatasource implements DataSource<RequestContext>{

  private requestSubjects = new BehaviorSubject<RequestContext[]>([]);
  private _pageTotal;
  private _total;

  get pageTotal(): number{
    return this._pageTotal;
  }

  get total(): number{
    return this._total;
  }

  constructor(private userRequestService: UserRequestService){}

  loadInbox(
    filter:string,
    sortDirection:string,
    pageIndex:number,
    pageSize:number,
    verb?:string,
    data?:string) {
    this.userRequestService
      .findAllRequest(filter, sortDirection, pageIndex, pageSize, verb, data)
      .subscribe(value => this.handleRes(value));
  }
  handleRes(res){
    this.requestSubjects.next(res.results);
    // this._pageTotal = res.page_total;
    this._total = res.total;
  }

  connect(collectionViewer?: CollectionViewer): Observable<RequestContext[]> {
    return this.requestSubjects.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.requestSubjects.complete();
  }
}
