import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, Observable, of} from 'rxjs';
import {UserService} from "../../../../../../../core/services";
import {ProfileContext, UserAdminstrative} from "../../../../../../../core/models";


export class AdminstrativeDataSource implements DataSource<UserAdminstrative>{

  private userSubjects = new BehaviorSubject<UserAdminstrative[]>([]);
  private _pageTotal;
  private _total;

  get pageTotal(): number{
    return this._pageTotal;
  }

  get total(): number{
    return this._total;
  }

  constructor(private userService: UserService){}

  loadUsers(
    filter:string,
    sortDirection:string,
    pageIndex:number,
    pageSize:number,
    verb?:string,
    data?:string) {
    this.userService
      .findAllAdminstrative(filter, sortDirection, pageIndex, pageSize, verb, data)
      .subscribe(value => this.handleRes(value));
  }
  handleRes(res){
    this.userSubjects.next(res.results);
    // this._pageTotal = res.page_total;
    this._total = res.total;
  }

  connect(collectionViewer?: CollectionViewer): Observable<UserAdminstrative[]> {
    return this.userSubjects.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.userSubjects.complete();
  }
}
