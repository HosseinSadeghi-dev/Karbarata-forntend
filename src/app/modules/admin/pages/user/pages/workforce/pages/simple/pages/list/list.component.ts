import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { UserService, AppService } from '@app/core/services';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {
  UserWorkforceMaster,
  UserWorkforceSimple,
  WorkforceStatus,
  UserStatus,
} from '@app/core/models';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '@app/shared/components/global/bottom-sheet/bottom-sheet.component';
import {WorkforceSimpleDatasource} from "../../services/workforce-simple.datasource";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import {WorkforceMasterDatasource} from "../../../master/services";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public data: UserWorkforceMaster[] = [];
  public message: string;

  dataSource: WorkforceSimpleDatasource;
  displayedColumns: string[] = [
    'count',
    'name',
    'pid',
    'phoneNumber',
    'exp',
    'status',
    'workstatus',
    'type',
    'id',
  ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet
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
    this.dataSource = new WorkforceSimpleDatasource(this.userService);
    console.log('datasource',this.dataSource)
    this.dataSource.loadWorkforces('', 'asc', 0, 5);
  }

  onDelete(id: number) {
    this.userService
    .deleteUserSimple(id)
    .subscribe(() => this.getList());
  }
  onUpdateStatus(id:number, status: WorkforceStatus){
    this.userService
    .updateUserSimpleStatus(id, {status})
    .subscribe(() => this.getList())
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
  public get UserStatus() {
    return UserStatus;
  }

  openBottomSheet(id: number): void {
    const bottomSheetRef = this._bottomSheet.open(BottomSheetComponent, {
      data: {
        option: [
          WorkforceStatus.AVAILABLE,
          WorkforceStatus.UNAVAILABLE,
          WorkforceStatus.WORK,
        ],
      },
    });

    bottomSheetRef
    .afterDismissed()
    .subscribe((res)=>{
      this.onUpdateStatus(id, res)
    })
  }
}
