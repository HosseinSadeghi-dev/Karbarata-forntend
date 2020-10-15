import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { UserService} from "@app/core/services";
import { MatTableDataSource } from "@angular/material/table";
import {ProfileContext, UserStatus, UserRole, RequestContext} from "@app/core/models";
import { MatPaginator } from "@angular/material/paginator";
import { Router } from "@angular/router";
import {UserDatasource} from "../../services";
import {MatSort} from "@angular/material/sort";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {

  data : ProfileContext[] = [];
  dataSource : UserDatasource;
  displayedColumns: string[] = ['count','user','phoneNumber','role','status','id'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

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
          this.loadUserPages();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadUserPages())
      )
      .subscribe();
  }
  loadUserPages() {
    this.dataSource.loadUsers(
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }
  getList(){
    this.paginator.firstPage();
    this.dataSource = new UserDatasource(this.userService);
    this.dataSource.loadUsers('', 'desc', 0, 5);
  }

  // getOne(id: number){
  //   this.userService.findUserById(id).subscribe(res=> this.handleRes(res));
  // }

  delete(id: number){
    this.userService.deleteUser(id).subscribe(res => this.getList())
  }

  onChangeStatus(id: number, status: UserStatus){
    const request = { status: null };
    status === UserStatus.ACTIVATE ? request.status = UserStatus.DEACTIVATE : request.status = UserStatus.ACTIVATE;
    this.userService.updateUserStatus(id,request).subscribe(res =>  this.getList())
  }

  onChangeRole(id: number, role: string){
    const request = { role };
    this.userService.updateUserStatus(id,request).subscribe(res =>  this.getList())
  }



  routing(user:ProfileContext){

    // this.router.navigateByUrl(`/admin/user/workforce/simple/${request.id}`);

    if(user.workforceMaster) {
      this.router.navigateByUrl(`/admin/user/workforce/master/${user.workforceMaster.id}`);
    }
    else if(user.workforceSimple) {
      this.router.navigateByUrl(`/admin/user/workforce/simple/${user.workforceSimple.id}`);
    }
    else if(user.adminstrative){
      this.router.navigateByUrl(`/admin/user/workforce/adminstrative/${user.adminstrative.id}`);
    }
    else
      this.router.navigateByUrl(`/admin/user/${user.id}`);
  }


  public get UserStatus() {
    return UserStatus;
  }

  public get UserRole() {
    return UserRole;
  }
}
