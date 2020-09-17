import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RequestService} from "@app/core/services";
import {
  MasterSkillContext,
  ProfileContext,
  RequestMasterContext,
  RequestMasterWorkforceContext,
  UserRole
} from "@app/core/models";

@Component({
  selector: 'app-request-workforce-master',
  templateUrl: './workforce-master.component.html',
  styleUrls: ['./workforce-master.component.scss']
})
export class WorkforceMasterComponent implements OnInit {

  skills: MasterSkillContext[] = [];
  requestMaster: RequestMasterContext
  workforces: RequestMasterWorkforceContext[] = [];
  selectedUsers: ProfileContext[] = [];
  stFormGroup: FormGroup;
  isView: boolean;
  isEdit: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private requestService: RequestService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.getWorkforces();

    this.stFormGroup = this.formBuilder.group({
      skill:[],
      workforces: [[], [Validators.required]],
    });
  }

  getWorkforces(){
    const params = this.activatedRoute.snapshot.params;
    if (params.id){
      this.requestService.findOneMasterRequestWorkForce(params.id).subscribe(
        res => this.handleRes(res)
      )
    }
  }

  handleRes(res: RequestMasterContext){
    // console.log('master',res);
    this.requestMaster = res

    res.workforces.length !== 0 && (this.isView = true);

    this.workforces = res.workforces;
    this.skills = res.skills

    this.getWorkforce(this.workforces);
  }

  getWorkforce(res){
    this.workforces = res;
    let skill : string = '';
    // this.workforces.forEach(row => selectedUsers.push(String(row.id)));

    this.workforces.forEach(row =>
      this.selectedUsers.push( row.user )
    );

    this.workforces.forEach(row =>
      skill = row.skill.name
    )

    // console.log('selected',selectedUsers);
    this.stFormGroup.get('workforces').setValue(this.selectedUsers);
    this.stFormGroup.get('skill').setValue(skill);
  }


  onSubmit(){
    const params = this.activatedRoute.snapshot.params;
    if (params.id){
      this.requestService.saveMasterRequestWorkForce(params.id, this.workforces).subscribe(
        res => this.router.navigateByUrl(`/admin/request/master/${params.id}`)
      )
    }
  }

  onEdit(){
    const params = this.activatedRoute.snapshot.params;
    if (params.id){
      this.requestService.updateMasterRequestWorkForce(params.id, this.workforces).subscribe(
        res => this.router.navigateByUrl(`/admin/request/master/${params.id}`)
      )
    }
  }

  public get UserRole() {
    return UserRole;
  }

}
