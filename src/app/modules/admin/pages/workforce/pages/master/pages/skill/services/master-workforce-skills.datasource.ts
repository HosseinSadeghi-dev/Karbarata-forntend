import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, Observable} from "rxjs";
import {MasterSkillContext} from "@app/core/models";
import {WorkforceService} from "@app/core/services";

export class MasterWorkforceSkillsDatasource implements DataSource<MasterSkillContext>{

  private skillsObject = new BehaviorSubject<MasterSkillContext[]>([]);
  private _pageTotal;
  private _total;

  get pageTotal(): number{
    return this._pageTotal;
  }

  get total(): number{
    return this._total;
  }

  constructor(private workForceService: WorkforceService){}

  loadSkills(
    filter:string,
    sortDirection:string,
    pageIndex:number,
    pageSize:number,
    verb?:string,
    data?:string) {
    this.workForceService
      .findAllMasterSkill(filter, sortDirection, pageIndex, pageSize, verb, data)
      .subscribe(value => this.handleRes(value));
  }
  handleRes(res){
    this.skillsObject.next(res.results);
    // this._pageTotal = res.page_total;
    this._total = res.total;
  }

  connect(collectionViewer?: CollectionViewer): Observable<MasterSkillContext[]> {
    return this.skillsObject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.skillsObject.complete();
  }
}
