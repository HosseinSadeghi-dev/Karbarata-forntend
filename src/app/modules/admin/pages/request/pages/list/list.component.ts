import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {RequestContext, RequestStatusType, WorkforceStatus} from "@app/core/models";
import {RequestService} from "@app/core/services";
import {RequestDatasource} from "../../services";
import {MatSort} from "@angular/material/sort";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {BottomSheetComponent} from "../../../../../../shared/components/global/bottom-sheet/bottom-sheet.component";

@Component({
  selector: 'app-home',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {

  data: RequestContext[] = [];
  dataSource: RequestDatasource;
  displayedColumns: string[] = [ 'count','number','user','type','status','created','id' ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    private requestService:RequestService,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    fromEvent(this.input.nativeElement,'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadRequestPages();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadRequestPages())
      )
      .subscribe();
  }

  loadRequestPages() {
    this.dataSource.loadRequests(
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  getList(){
    this.paginator.firstPage();
    this.dataSource = new RequestDatasource(this.requestService);
    this.dataSource.loadRequests('', 'desc', 0, 5);
  }

  onChangeStatus(id:number){
    const bottomSheetRef = this.bottomSheet.open(BottomSheetComponent, {
      data: {
        option: [
          RequestStatusType.AWAITING_EXP,
          RequestStatusType.APPROVAL_EXP,
          RequestStatusType.CANCEL_EXP,
          RequestStatusType.DONE,
        ],
        type: 'request',
      },
    });

    bottomSheetRef
      .afterDismissed()
      .subscribe((res)=>{
        res? this.onUpdateStatus(id, res): ''
      })
  }

  onUpdateStatus(id, data){
    this.requestService.updateRequestStatus(id, {status: data})
      .subscribe( () => this.getList() )
  }

  delete(id: number){
    this.requestService.deleteRequest(id).subscribe(res => this.getList())
  }

  public get RequestStatus() {
    return RequestStatusType
  }

}
