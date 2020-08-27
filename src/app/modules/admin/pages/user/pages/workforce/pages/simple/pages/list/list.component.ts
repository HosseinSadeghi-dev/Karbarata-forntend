import { Component, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public data: UserWorkforceMaster[] = [];
  public message: string;
  public isLoading: boolean;

  dataSource = null;
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

  bottomsheetdata: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filterPredicate = filterValue.trim().toLowerCase();
  }

  constructor(
    private userService: UserService,
    public app: AppService,
    public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet
  ) {
    app.loading$.subscribe((value) => (this.isLoading = value));
  }

  ngOnInit() {
    this.getList();
  }
  addMasterUser() {}
  getList() {
    this.app.nextLoading(true);
    this.userService
    .findAllUserSimple()
    .subscribe((res) => this.handleRes(res));
  }
  handleRes(res) {
    this.data = res;
    this.dataSource = new MatTableDataSource<UserWorkforceSimple>(this.data);

    setTimeout(() => (this.dataSource.paginator = this.paginator));
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
