import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService} from "@app/core/services";
import { MatTableDataSource } from "@angular/material/table";
import {ProfileContext, UserStatus, UserRole, RequestContext} from "@app/core/models";
import { MatPaginator } from "@angular/material/paginator";
import { Router } from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  data : ProfileContext[] = [];
  dataSource = null;
  displayedColumns: string[] = ['count','user','phoneNumber','role','status','id'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(){
    this.userService.findAllUser().subscribe(res=> this.handleRes(res))
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

  handleRes(res){
    this.data = res;
    this.dataSource = new MatTableDataSource<ProfileContext>(this.data);
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  routing(user:ProfileContext){

    // this.router.navigateByUrl(`/admin/user/workforce/simple/${request.id}`);

    if(user.workforceMaster)
    {
      this.router.navigateByUrl(`/admin/user/workforce/master/${user.workforceMaster.id}`);
    }
    else if(user.workforceSimple)
    {
      this.router.navigateByUrl(`/admin/user/workforce/simple/${user.workforceSimple.id}`);
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
