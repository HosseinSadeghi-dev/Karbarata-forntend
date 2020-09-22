import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {ProfileContext, UserRole, WorkforceSimpleType} from "@app/core/models";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "@app/core/services";
import {UserDatasource} from "@app/modules/admin/pages/user/services";
import {MatSort} from "@angular/material/sort";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";

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
export class UserChooseComponent implements OnInit, AfterViewInit {

  users: ProfileContext[] = [];
  displayedColumns: string[] = ['select', 'id', 'name','phoneNumber', 'roles'];
  // dataSource = new MatTableDataSource<ProfileContext>([]);
  dataSource: UserDatasource
  selection = new SelectionModel<ProfileContext>(this.data.multiple, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<UserChooseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // this.userService.findAllUser('role',this.data.roles).subscribe(
    //   res => this.handleRes(res)
    // )

    this.paginator.firstPage();
    this.dataSource = new UserDatasource(this.userService);
    this.dataSource.loadUsers('', 'asc', 1, 3,'role', this.data.roles);
    let selectedUsers: ProfileContext[] = [];
    this.data.selected.forEach(row => {
      selectedUsers.push(this.users.find(i => i.id === row.id));
    });
    this.selection = new SelectionModel<ProfileContext>(this.data.multiple, selectedUsers);
    console.log('data',this.dataSource)
  }

  handleRes(res){
    // this.users = res;
    // this.dataSource = new MatTableDataSource<ProfileContext>(this.users);

    let selectedUsers: ProfileContext[] = [];
    this.data.selected.forEach(row => {
      selectedUsers.push(this.users.find(i => i.id === row.id));
    });
    this.selection = new SelectionModel<ProfileContext>(this.data.multiple, selectedUsers);
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
    // this.paginator.firstPage();
    // this.dataSource = new UserDatasource(this.userService);
    // this.dataSource.loadUsers('', 'asc', 1, 3,'role', this.data.roles);
    // let selectedUsers: ProfileContext[] = [];
    // this.data.selected.forEach(row => {
    //   selectedUsers.push(this.users.find(i => i.id === row.id));
    // });
    // this.selection = new SelectionModel<ProfileContext>(this.data.multiple, selectedUsers);
    // console.log('data',this.dataSource)
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
