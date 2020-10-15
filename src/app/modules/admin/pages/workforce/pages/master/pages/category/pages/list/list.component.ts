import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MasterCategoryContext} from '@app/core/models';
import {WorkforceService} from '@app/core/services';
import {MatSort} from "@angular/material/sort";
import {MasterWorkforceCategoryDatasource} from "../../services";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import {ArticlesDataSource} from "../../../../../../../article/services";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {
  data: MasterCategoryContext[] = [];
  dataSource : MasterWorkforceCategoryDatasource;
  displayedColumns: string[] = ['count','name','image','svg','id'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    private workforceService: WorkforceService
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
          this.loadSkillsPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadSkillsPage())
      )
      .subscribe();
  }
  loadSkillsPage() {
    this.dataSource.loadCategories(
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  getList(){
    this.paginator.firstPage();
    this.dataSource = new MasterWorkforceCategoryDatasource(this.workforceService);
    this.dataSource.loadCategories('', 'desc', 0, 5);
  }

  onDelete(slug: string){
    this.workforceService.deleteMasterCategory(slug).
    subscribe(() => this.getList() )
  }
}
