import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MasterSkillContext, ProfileContext, RequestMasterWorkforceContext, UserRole} from "@app/core/models";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {UserService, WorkforceService} from "@app/core/services";

export interface dialogContext {
  workforces?: RequestMasterWorkforceContext[],
  skills?: MasterSkillContext[]
}

@Component({
  selector: 'app-request-workforce-master',
  templateUrl: './request-workforce-master.component.html',
  styleUrls: ['./request-workforce-master.component.scss']
})
export class RequestWorkforceMasterComponent implements OnInit {

  skills: MasterSkillContext[] = [];
  selectedUsers: ProfileContext[] = [];
  users: ProfileContext[] = [];
  choosed: MasterSkillContext;
  displayedColumns: string[] = ['select', 'id', 'name','phoneNumber', 'experience', 'primary','secondary'];
  dataSource = new MatTableDataSource<ProfileContext>([]);
  selection = new SelectionModel<ProfileContext>(true, []);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    public dialogRef: MatDialogRef<RequestWorkforceMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialogContext,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    console.log('data master',this.data)

    // this.skills = Array.from(new Set(this.data));
    // console.log('voroodi',this.data)

    this.skills = this.data.skills

    this.choosed = this.skills[0];
    this.getWorkforces(this.skills[0].slug)
  }

  getWorkforces(data: string){
      this.userService
        .findAllUser('skill',data)
        .subscribe(res => this.handleRes(res,data))
  }

  handleRes(res,skill){
    this.users = res;

    this.dataSource = new MatTableDataSource<ProfileContext>(this.users);

    console.log('skill',skill)

    this.data.skills.forEach(
      row => {
        if (row.slug === skill){
          this.data.workforces.forEach(
            each => {
              if(each.skill.slug === row.slug)
              {
                this.selectedUsers.push(this.users.find(i => i.id === each.user.id));
              }
            }
          )
        }
      }
    )

    console.log('selected user',this.selectedUsers)

    // this.data.selected.forEach(
    //   row => {
    //   this.selectedUsers.push(this.users.find(i => i.id === row.id));
    // }
    // );

    //////////////////////////////

    // this.data.selected.forEach(
    //   row => {
    //     this.selectedUsers.push(row);
    //   }
    // );

    // console.log('selected User2',this.data);

    this.selection = new SelectionModel<ProfileContext>(true, this.selectedUsers);
    // for (let i of this.selectedUsers) {
    //   this.selection.select(i)
    // }
    //
    // console.log('selection',this.selectedUsers)

    //////////////////////////

    // this.selection.selected.forEach(row => {
    //   this.data.selected.push(this.users.find(i => i.id !== row.id));
    // });

    // this.selection.selected.forEach(row => {
    //   this.data.workforces.forEach(
    //     each => each.user = row
    //   );
    // });
    //
    // console.log('laaaaaaaaaast',this.data)

  }

  checkbox(event){
    console.log('event',event)

    ///source.name = user.id

    if(event.checked){
      console.log('yap')
      this.data.workforces.push(
        {
          user: this.users.find(value => value.id === event.source.name),
          skill: this.choosed
        }
      )
    }
    else{
      console.log('nope')
      this.data.workforces = this.data.workforces.filter(obj => obj.user.id !== event.source.name)
    }

    console.log('data',this.data)
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
    // this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: ProfileContext): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
