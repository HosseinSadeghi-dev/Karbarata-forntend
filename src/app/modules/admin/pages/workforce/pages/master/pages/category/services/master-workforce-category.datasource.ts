import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, Observable} from 'rxjs';
import {MasterCategoryContext} from "@app/core/models";
import {WorkforceService} from "@app/core/services";


export class MasterWorkforceCategoryDatasource implements DataSource<MasterCategoryContext>{

  private categoriesSubject = new BehaviorSubject<MasterCategoryContext[]>([]);
  private _pageTotal;
  private _total;

  get pageTotal(): number{
    return this._pageTotal;
  }

  get total(): number{
    return this._total;
  }

  constructor(private workForceService: WorkforceService){}

  loadCategories(
    filter:string,
    sortDirection:string,
    pageIndex:number,
    pageSize:number,
    verb?:string,
    data?:string) {
    this.workForceService
      .findAllMasterCategory(filter, sortDirection, pageIndex, pageSize, verb, data)
      .subscribe(value => this.handleRes(value));
  }
  handleRes(res){
    this.categoriesSubject.next(res.results);
    // this._pageTotal = res.page_total;
    this._total = res.total;
  }

  connect(collectionViewer?: CollectionViewer): Observable<MasterCategoryContext[]> {
    return this.categoriesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.categoriesSubject.complete();
  }
}
