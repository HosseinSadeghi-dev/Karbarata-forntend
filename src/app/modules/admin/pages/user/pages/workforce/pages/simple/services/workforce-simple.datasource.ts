import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, Observable, of} from 'rxjs';

import {UserWorkforceSimple} from "../../../../../../../../../core/models";
import {UserService} from "../../../../../../../../../core/services";


export class WorkforceSimpleDatasource implements DataSource<UserWorkforceSimple>{

  private workforcesSubject = new BehaviorSubject<UserWorkforceSimple[]>([]);
  private _pageTotal;
  private _total;

  get pageTotal(): number{
    return this._pageTotal;
  }

  get total(): number{
    return this._total;
  }

  constructor(private userService: UserService){}

  loadWorkforces(
    filter:string,
    sortDirection:string,
    pageIndex:number,
    pageSize:number,
    verb?,
    data?
  ) {
    this.userService
      .findAllUserSimple(filter, sortDirection, pageIndex, pageSize, verb, data)
      .subscribe(value => this.handleRes(value));
  }
  handleRes(res){
    this.workforcesSubject.next(res.results);
    this._pageTotal = res.page_total;
    this._total = res.total;
  }

  connect(collectionViewer: CollectionViewer): Observable<UserWorkforceSimple[]> {
    return this.workforcesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.workforcesSubject.complete();
  }
}
