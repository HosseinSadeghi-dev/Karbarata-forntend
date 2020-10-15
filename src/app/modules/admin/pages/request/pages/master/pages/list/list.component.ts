import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  RequestMasterContext,
  RequestStatusType,
} from "@app/core/models";
import {MatPaginator} from "@angular/material/paginator";
import {RequestService} from "@app/core/services";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import {MatSort} from "@angular/material/sort";
import {RequestMasterDatasource} from "../../services";

@Component({
  selector: 'app-home',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {

  data: RequestMasterContext[] = [];
  dataSource: RequestMasterDatasource;
  displayedColumns: string[] = [ 'count','number','user','status','created','id' ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    private requestService:RequestService
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
    this.dataSource = new RequestMasterDatasource(this.requestService);
    this.dataSource.loadRequests('', 'desc', 0, 5);
    console.log('data',this.dataSource)
  }

  delete(id: number){
    this.requestService.deleteMasterRequest(id).subscribe(res => this.getList())
  }

  public get RequestStatus() {
    return RequestStatusType
  }

}
