import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService} from "@app/core/services";
import { MatTableDataSource } from "@angular/material/table";
import { ProfileContext, UserStatus, UserRole } from "@app/core/models";
import { MatPaginator } from "@angular/material/paginator";

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
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getList();
    console.log('element') ;
  }

  getList(){
    this.userService.findAllUser().subscribe(res=> this.handleRes(res))
  }

  getOne(id: number){
    this.userService.findUserById(id).subscribe(res=> this.handleRes(res));
  }

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

  public get UserStatus() {
    return UserStatus;
  }

  public get UserRole() {
    return UserRole;
  }
}
