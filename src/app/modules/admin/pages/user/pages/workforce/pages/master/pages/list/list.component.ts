import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService, AppService } from '@app/core/services';
import { UserMaster, UserWorkforceMaster } from '@app/core/models';
import { WorkforceStatus } from '@app/core/models'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public data : UserWorkforceMaster[] = [];
  public message: string;
  public isLoading: boolean;

  dataSource = null;
  displayedColumns: string[] = ['count','name','pid','phoneNumber','primarySkill','secondarySkills','exp','status','id'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private api: UserService,
    public app: AppService,
    public dialog: MatDialog
  ) {
    app.loading$.subscribe(value => this.isLoading = value);
  }

  ngOnInit() {
    this.getList();
  }
  addMasterUser(){

  }
  getList(){
    this.app.nextLoading(true);
    this.api.findAllUserMaster().subscribe(
      res=> this.handleRes(res),
      err => this.handleErr(err)
    )
  }
  handleRes(res){
    this.app.nextLoading(false);
    this.data = res;
    this.dataSource = new MatTableDataSource<UserWorkforceMaster>(this.data);
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }
  handleErr(err){
    this.app.nextLoading(false);
    console.log(err);
  }
  onDelete(id: number){
    this.app.nextLoading(true);
    this.api.deleteUserMaster(id).subscribe(
      res => this.handleResDelete(res),
      err => this.handleErr(err)
    )
  }
  handleResDelete(res){
    this.app.nextLoading(false);
    this.app.handleResponse(res.message);
    this.getList();
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
  handleResUpdate(res){
    this.app.nextLoading(false);
    this.app.handleResponse(res.message);
    this.getList();
  }
  public get workforceStatus() {
    return WorkforceStatus;
  }
}
