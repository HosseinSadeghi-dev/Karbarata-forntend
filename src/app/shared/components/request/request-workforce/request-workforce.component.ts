import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileContext, UserRole} from "@app/core/models";
import {RequestService} from "@app/core/services";

@Component({
  selector: 'app-request-workforce',
  templateUrl: './request-workforce.component.html',
  styleUrls: ['./request-workforce.component.scss']
})
export class RequestWorkforceComponent implements OnInit {

  workforces: ProfileContext[] = [];
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
    this.stFormGroup = this.formBuilder.group({
      workforces: [[], [Validators.required]],
    });
    this.getWorkforces();
  }

  getWorkforces(){
    const params = this.activatedRoute.snapshot.params;
    if (params.id){
      this.requestService.findOneSimpleRequestWorkForce(params.id).subscribe(
        res => this.handleRes(res)
      )
    }
  }

  getWorkforce(res){
    this.workforces = res;
    const selectedUsers: string[] = [];
    this.workforces.forEach(row => selectedUsers.push(String(row.id)));
    this.stFormGroup.get('workforces').setValue(selectedUsers);
  }

  onSubmit(){
    const form = this.stFormGroup.value;
    const params = this.activatedRoute.snapshot.params;
    if (params.id){
      this.requestService.saveSimpleRequestWorkForce(params.id,form).subscribe(
        res => this.router.navigateByUrl(`/admin/request/simple/${params.id}`)
      )
    }
  }

  handleRes(res){
    res.length !== 0 && (this.isView = true);
    this.workforces = res;
    this.getWorkforce(this.workforces);
  }

  public get UserRole() {
    return UserRole;
  }

}
