import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, Observable, of} from 'rxjs';

import { UserWorkforceMaster} from "../../../../../../../../../core/models";
import {UserService} from "../../../../../../../../../core/services";


export class WorkforceMasterDatasource implements DataSource<UserWorkforceMaster>{

  private workforcesSubject = new BehaviorSubject<UserWorkforceMaster[]>([]);
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
      .findAllUserMaster(filter, sortDirection, pageIndex, pageSize, verb, data)
      .subscribe(value => this.handleRes(value));
  }
  handleRes(res){
    this.workforcesSubject.next(res.results);
    // this._pageTotal = res.page_total;
    this._total = res.total;
  }

  connect(collectionViewer: CollectionViewer): Observable<UserWorkforceMaster[]> {
    return this.workforcesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.workforcesSubject.complete();
  }
}
