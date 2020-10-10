import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, Observable, of} from 'rxjs';

import {ConstructService} from "@app/core/services";
import {ConstructContext} from "@app/core/models";


export class ConstructDatasource implements DataSource<ConstructContext>{

  private constructSubjects = new BehaviorSubject<ConstructContext[]>([]);
  private _pageTotal;
  private _total;

  get pageTotal(): number{
    return this._pageTotal;
  }

  get total(): number{
    return this._total;
  }

  constructor(private constructService: ConstructService){}

  loadConstructs(
    filter:string,
    sortDirection:string,
    pageIndex:number,
    pageSize:number,
    verb?:string,
    data?:string) {
    this.constructService
      .findAllConstructSkill(filter, sortDirection, pageIndex, pageSize, verb, data)
      .subscribe(value => this.handleRes(value));
  }
  handleRes(res){
    this.constructSubjects.next(res.results);
    this._pageTotal = res.page_total;
    this._total = res.total;
  }

  connect(collectionViewer?: CollectionViewer): Observable<ConstructContext[]> {
    return this.constructSubjects.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.constructSubjects.complete();
  }
}
