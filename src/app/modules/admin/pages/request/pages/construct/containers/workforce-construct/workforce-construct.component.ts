import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  MasterSkillContext,
  ProfileContext, RequestConstructContext,
  RequestMasterContext,
  RequestMasterWorkforceContext, UserRole
} from "../../../../../../../../core/models";
import {UserDatasource} from "../../../../../user/services";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ActivatedRoute} from "@angular/router";
import {RequestService, UserService} from "../../../../../../../../core/services";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";

@Component({
  selector: 'app-workforce-construct',
  templateUrl: './workforce-construct.component.html',
  styleUrls: ['./workforce-construct.component.scss']
})
export class WorkforceConstructComponent implements OnInit {

  requestConstruct: RequestConstructContext
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
      this.requestService.findOneConstructRequestWorkForce(this.params.id).subscribe(
        res => this.requestConstruct = res
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
    this.dataSource.loadUsers('', 'asc', 1, 3, 'skill', data);
    this.handleTable(data)
    // console.log('data',this.dataSource)
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

    this.requestConstruct.masterWorkforces.skills.forEach(
      row => {
        if (row.slug === skill){
          this.requestConstruct.masterWorkforces.workforces.forEach(
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
      this.requestService.updateConstructRequestWorkForce(this.params.id, workforce, this.prev.id).subscribe(
        () => this.getWorkforcesByRequest()
      )
    }
    else {
      this.requestService.saveConstructRequestWorkForce(this.params.id, workforce).subscribe(
        // res => this.router.navigateByUrl(`/admin/request/master/${this.data.id}`)
        () => this.getWorkforcesByRequest()
      )
    }
  }

  onDelete(data){
    console.log('delete',data)
    this.requestService.deleteConstructRequestWorkForce(this.params.id, data.id).subscribe(
      () => this.getWorkforcesByRequest()
    )
  }

  public get UserRole() {
    return UserRole;
  }

}
