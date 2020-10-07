import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { UserService, AppService } from '@app/core/services';
import { UserMaster, UserWorkforceMaster } from '@app/core/models';
import { WorkforceStatus } from '@app/core/models'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import {MatSort} from "@angular/material/sort";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import {WorkforceMasterDatasource} from "../../services";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {

  public data : UserWorkforceMaster[] = [];
  public message: string;

  dataSource : WorkforceMasterDatasource;
  displayedColumns: string[] = ['count','name','pid','phoneNumber','primarySkill','secondarySkills','exp','status','id'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    private userService: UserService,
    public dialog: MatDialog
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
          this.loadWorkforcePage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadWorkforcePage())
      )
      .subscribe();
  }
  loadWorkforcePage() {
    this.dataSource.loadWorkforces(
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }
  getList(){
    this.paginator.firstPage();
    this.dataSource = new WorkforceMasterDatasource(this.userService);
    console.log('datasource',this.dataSource)
    this.dataSource.loadWorkforces('', 'asc', 0, 5);
  }

  onDelete(id: number){
    this.userService.deleteUserMaster(id).subscribe(
      () => this.getList()
    )
  }
  // onChangeStatus(slug: string, status: ArticleStatus){
  //   this.app.nextLoading(true);
  //   const request = { status: null };
  //   status === ArticleStatus.PUBLISHED ? request.status = ArticleStatus.UNPUBLISHED : request.status = ArticleStatus.PUBLISHED;
  //   this.api.updateArticleStatus(slug,request).subscribe(
  //     res => this.handleResUpdate(res),
  //     err => {console.log(err);this.app.nextLoading(false)},
  //   )
  // }

  public get workforceStatus() {
    return WorkforceStatus;
  }
}
