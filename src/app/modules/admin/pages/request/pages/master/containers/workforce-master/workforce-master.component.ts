import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RequestService, UserService} from "@app/core/services";
import {
  MasterSkillContext,
  ProfileContext,
  RequestMasterContext,
  RequestMasterWorkforceContext,
  UserRole
} from "@app/core/models";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-request-workforce-master',
  templateUrl: './workforce-master.component.html',
  styleUrls: ['./workforce-master.component.scss']
})
export class WorkforceMasterComponent implements OnInit {

  requestMaster: RequestMasterContext
  selectedUsers: ProfileContext[] = [];
  isEdit: boolean = false;
  users: ProfileContext[] = [];
  choosedSkill: MasterSkillContext;
  choosedUser: ProfileContext;
  prev: RequestMasterWorkforceContext;
  params: any;
  displayedColumns: string[] = ['select', 'id', 'name','phoneNumber', 'experience', 'primary','secondary'];
  dataSource = new MatTableDataSource<ProfileContext>([]);
  selection = new SelectionModel<ProfileContext>(true, []);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private requestService: RequestService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.params = this.activatedRoute.snapshot.params
    this.getWorkforcesByRequest();
  }

  getWorkforcesByRequest(){
    if (this.params.id){
      this.requestService.findOneMasterRequestWorkForce(this.params.id).subscribe(
        res => this.handleRes(res)
      )
    }
  }

  handleRes(res: RequestMasterContext){
    this.requestMaster = res
  }

  getWorkforcesBySkill(data: string){
    this.userService
      .findAllUser('skill',data)
      .subscribe(res => this.handleTable(res,data))
  }

  handleTable(res,skill){

    this.choosedUser = null;

    this.users = res;

    this.dataSource = new MatTableDataSource<ProfileContext>(this.users);

    this.requestMaster.skills.forEach(
      row => {
        if (row.slug === skill){
          this.requestMaster.workforces.forEach(
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

    this.selection = new SelectionModel<ProfileContext>(true, this.selectedUsers);
  }

  check(user){
    this.choosedUser = user.value;
  }

  onSubmit(){

    let workforce: RequestMasterWorkforceContext = {
      user: this.choosedUser,
      skill: this.choosedSkill
    }

    if(this.isEdit){
      console.log(this.prev)
      this.requestService.updateMasterRequestWorkForce(this.params.id, workforce, this.prev.id).subscribe(
        () => this.getWorkforcesByRequest()
      )
    }
    else {
      this.requestService.saveMasterRequestWorkForce(this.params.id, workforce).subscribe(
        // res => this.router.navigateByUrl(`/admin/request/master/${this.data.id}`)
        () => this.getWorkforcesByRequest()
      )
    }
  }

  onDelete(data){
    console.log('delete',data)
    this.requestService.deleteMasterRequestWorkForce(this.params.id, data.id).subscribe(
      () => this.getWorkforcesByRequest()
    )
  }

  public get UserRole() {
    return UserRole;
  }

}
