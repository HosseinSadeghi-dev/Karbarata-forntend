import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {NewsCategoryContext} from '@app/core/models/_news.model';
import {NewsService} from '@app/core/services';
import {NewsCategoryDatasource} from "../../services";
import {MatSort} from "@angular/material/sort";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit,AfterViewInit {
  public data : NewsCategoryContext[] = [];
  public message: string;

  dataSource : NewsCategoryDatasource;
  displayedColumns: string[] = ['count','name','id'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit() {
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
          this.loadCategoriesPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadCategoriesPage())
      )
      .subscribe();
  }

  loadCategoriesPage() {
    this.dataSource.loadCategories(
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  getList(){
    this.paginator.firstPage();
    this.dataSource = new NewsCategoryDatasource(this.newsService);
    this.dataSource.loadCategories('', 'asc', 0, 5);
  }

  delete(slug){
    this.newsService.deleteNewsCategory(slug).subscribe(res => this.getList())
  }
}
