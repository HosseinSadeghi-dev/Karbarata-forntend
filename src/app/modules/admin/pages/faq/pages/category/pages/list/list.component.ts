import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {FaqService} from "@app/core/services";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {FaqCategoryContext} from '@app/core/models';
import {FaqCategoryDatasource} from "../../services";
import {MatSort} from "@angular/material/sort";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {

  public data: FaqCategoryContext[] = [];
  dataSource : FaqCategoryDatasource;
  displayedColumns: string[] = ['count', 'name', 'id'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    private faqService: FaqService,
  ) {}

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
          this.loadCategoriesPages();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadCategoriesPages())
      )
      .subscribe();
  }

  loadCategoriesPages() {
    this.dataSource.loadCategories(
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  getList(){
    this.paginator.firstPage();
    this.dataSource = new FaqCategoryDatasource(this.faqService);
    this.dataSource.loadCategories('', 'desc', 0, 5);
    console.log('data',this.dataSource)
  }

  delete(slug) {
    this.faqService.deleteFaqCategory(slug).
    subscribe(res => this.getList())
  }

}
