import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, Observable} from 'rxjs';
import { RequestContact} from "@app/core/models";
import {ContactService} from "@app/core/services";


export class CooperationDatasource implements DataSource<RequestContact>{

  private userSubjects = new BehaviorSubject<RequestContact[]>([]);
  private _pageTotal;
  private _total;

  get pageTotal(): number{
    return this._pageTotal;
  }

  get total(): number{
    return this._total;
  }
////
  constructor(private contactService: ContactService){}

  loadCooperation(
    filter:string,
    sortDirection:string,
    pageIndex:number,
    pageSize:number,
    verb?:string,
    data?:string) {
    this.contactService
      .findAllCooperation(filter, sortDirection, pageIndex, pageSize, verb, data)
      .subscribe(value => this.handleRes(value));
  }
  handleRes(res){
    this.userSubjects.next(res.results);
    // this._pageTotal = res.page_total;
    this._total = res.total;
  }

  connect(collectionViewer?: CollectionViewer): Observable<RequestContact[]> {
    return this.userSubjects.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.userSubjects.complete();
  }
}
