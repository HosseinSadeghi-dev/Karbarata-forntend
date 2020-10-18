import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RequestConstructContext, RequestConstructType, RequestStatusType} from "@app/core/models";
import {RequestService} from "@app/core/services";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import {RequestConstructDatasource} from "../../services";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit,AfterViewInit {

  data: RequestConstructContext[] = [];
  dataSource: RequestConstructDatasource;
  displayedColumns: string[] = [ 'count','number','user','type','construct','status','created','id' ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    private requestService: RequestService
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
    this.dataSource = new RequestConstructDatasource(this.requestService);
    this.dataSource.loadRequests('', 'desc', 0, 5);
  }

  delete(id: number){
    this.requestService.deleteConstructRequest(id).subscribe(res => this.getList())
  }

  public get RequestStatus() {
    return RequestStatusType
  }
  public get ConstructType() {
    return RequestConstructType;
  }

}
