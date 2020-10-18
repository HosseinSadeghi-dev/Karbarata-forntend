import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProfileContext, UserRole, UserStatus} from "../../../../../../../../core/models";
import {MatPaginator} from "@angular/material/paginator";
import {UserService} from "../../../../../../../../core/services";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import {UserDatasource} from "../../../../services";
import {AdminstrativeDataSource} from "../../services";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  data : ProfileContext[] = [];
  dataSource : AdminstrativeDataSource;
  // dataSource = null;
  displayedColumns: string[] = ['count','user','phoneNumber','insuranceCode','role','status','id'];
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
      this.paginator.pageSize,
      );
  }


  // getList(){
  //   this.userService.findAllUser().subscribe(res=> this.handleRes(res))
  // }

  getList(){
    this.paginator.firstPage();
    this.dataSource= new AdminstrativeDataSource(this.userService);
    this.dataSource.loadUsers('', 'asc', 0, 3);
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


  public get UserStatus() {
    return UserStatus;
  }

  public get UserRole() {
    return UserRole;
  }

}
