import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ProfileContext, UserRole, WorkforceSimpleType} from "@app/core/models";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "@app/core/services";

export interface DialogData {
  roles?: UserRole,
  multiple?: boolean,
  selected?: ProfileContext[]
}

@Component({
  selector: 'app-user-choose',
  templateUrl: './user-choose.component.html',
  styleUrls: ['./user-choose.component.scss']
})
export class UserChooseComponent implements OnInit {

  users: ProfileContext[] = [];
  displayedColumns: string[] = ['select', 'id', 'name','phoneNumber', 'roles'];
  dataSource = new MatTableDataSource<ProfileContext>([]);
  selection = new SelectionModel<ProfileContext>(this.data.multiple, []);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    public dialogRef: MatDialogRef<UserChooseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.findAllUser('role',this.data.roles).subscribe(
      res => this.handleRes(res)
    )
  }

  handleRes(res){
    this.users = res;
    let selectedUsers: ProfileContext[] = [];

    this.dataSource = new MatTableDataSource<ProfileContext>(this.users);
    this.data.selected.forEach(row => {
      selectedUsers.push(this.users.find(i => i.id === row.id));
    });
    this.selection = new SelectionModel<ProfileContext>(this.data.multiple, selectedUsers);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: ProfileContext): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  public get UserRole(){
    return UserRole;
  }

  public get WorkforceSimpleType(){
    return WorkforceSimpleType;
  }

}
