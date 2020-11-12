import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ContactService} from "@app/core/services";
import {Router} from "@angular/router";
import {ComplainDatasource} from "../../services/complain.datasource";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  dataSource : ComplainDatasource;
  displayedColumns: string[] = ['count','user','phoneNumber','description'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    private contactService: ContactService,
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
          this.loadComplainPages();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadComplainPages())
      )
      .subscribe();
  }

  loadComplainPages() {
    this.dataSource.loadComplain(
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize,
    );
  }

  getList(){
    this.paginator.firstPage();
    this.dataSource= new ComplainDatasource(this.contactService);
    this.dataSource.loadComplain('', 'desc', 0, 5);
  }

}
