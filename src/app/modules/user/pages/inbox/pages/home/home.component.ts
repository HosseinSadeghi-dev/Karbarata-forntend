import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UserRequestService} from "@app/core/services";
import {Router} from "@angular/router";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import {RequestStatusType} from "@app/core/models";
import {InboxDatasource} from "../../services";

@Component({
  selector: 'app-list',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataSource : InboxDatasource;
  displayedColumns: string[] = ['count','type','statusPerDay','status','serviceDate', 'description'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    private userRequestService: UserRequestService,
    private router: Router
  ) {}

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
          this.loadInboxPages();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadInboxPages())
      )
      .subscribe();
  }

  loadInboxPages() {
    this.dataSource.loadInbox(
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize,
    );
  }

  getList(){
    this.paginator.firstPage();
    this.dataSource= new InboxDatasource(this.userRequestService);
    this.dataSource.loadInbox('', 'desc', 0, 5);
  }

  public get RequestStatus() {
    return RequestStatusType
  }

}

