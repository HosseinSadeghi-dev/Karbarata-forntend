import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RequestService, UserService} from "@app/core/services";
import {
  MasterSkillContext,
  ProfileContext,
  RequestMasterContext,
  RequestMasterWorkforceContext,
  UserRole
} from "@app/core/models";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {UserDatasource} from "../../../../../user/services";
import {MatSort} from "@angular/material/sort";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";

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
  // dataSource = new MatTableDataSource<ProfileContext>([]);
  dataSource: UserDatasource;
  selection = new SelectionModel<ProfileContext>(true, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private requestService: RequestService,
  ) { }

  ngOnInit(): void {
    this.params = this.activatedRoute.snapshot.params
    this.getWorkforcesByRequest();
  }

  getWorkforcesByRequest(){
    if (this.params.id){
      this.requestService.findOneMasterRequestWorkForce(this.params.id).subscribe(
        res => {
          this.requestMaster = res;
        }
      )
    }
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
      'skill',
      this.choosedSkill.slug);
  }

  getList(data: string){
    this.paginator.firstPage();
    this.dataSource = new UserDatasource(this.userService);
    this.dataSource.loadUsers('', 'asc', 0, 5, 'skill', data);
    this.handleTable(data)
  }

  // getList(data: string){
  //   this.userService
  //     .findAllUser('skill',data)
  //     .subscribe(res => this.handleTable(res,data))
  // }

  handleTable(skill){

    this.choosedUser = null;

    // this.users = res;
    //
    // this.dataSource = new MatTableDataSource<ProfileContext>(this.users);

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
    this.requestService.deleteMasterRequestWorkForce(this.params.id, data.id).subscribe(
      () => this.getWorkforcesByRequest()
    )
  }

  public get UserRole() {
    return UserRole;
  }

}
