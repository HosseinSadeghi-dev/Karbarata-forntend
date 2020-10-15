import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ContactService} from "@app/core/services";
import {Router} from "@angular/router";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import {ContactUsDatasource} from "../../services/contactUs.datasource";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  dataSource : ContactUsDatasource;
  displayedColumns: string[] = ['count','user','phoneNumber','score','description','id'];
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
          this.loadContactUsPages();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadContactUsPages())
      )
      .subscribe();
  }

  loadContactUsPages() {
    this.dataSource.loadContactUs(
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize,
    );
  }

  getList(){
    this.paginator.firstPage();
    this.dataSource= new ContactUsDatasource(this.contactService);
    this.dataSource.loadContactUs('', 'asc', 0, 5);
  }

}
