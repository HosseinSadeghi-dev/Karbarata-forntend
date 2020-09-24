import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {isNumeric} from "rxjs/internal-compatibility";

import {
  ConstructSkillContext,
  ProfileContext, RequestConstructType,
  UserRole
} from "@app/core/models";

import {
  ConstructService,
  RequestService,
  WorkforceService
} from "@app/core/services";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  stFormGroup: FormGroup;
  skills:ConstructSkillContext[] = [];
  minDate = new Date();
  userPreview: ProfileContext;
  isEdit: boolean = false;

  constructor(
    private workForceService: WorkforceService,
    private constructService: ConstructService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private requestService: RequestService
  ) { }


  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params.id && isNumeric(params.id)) {
      this.isEdit = true;
      this.requestService.findOneRequest(params.id).subscribe(
        res => this.handleRes(res)
      );
    }

    this.constructService.findAllConstructSkill().subscribe(
      res => this.handleResData(res)
    );

    this.stFormGroup = this.formBuilder.group({
      construct: ['', [Validators.required,Validators.minLength(1)]],
      type: ['',Validators.required],
      request: this.formBuilder.group({
        approximateArea: ['', Validators.required],
        address: ['', Validators.required],
        houseNumber: ['', Validators.required],
        description: [''],
        isForce: [],
        serviceDate: ['', Validators.required],
        user: ['',Validators.required],
      }),

    });
  }

  handleResData(res){
    this.skills = res;
  }

  onSubmit(){
    const form = this.stFormGroup.value;

    const params = this.activatedRoute.snapshot.params;
    if (this.isEdit){
      this.requestService.updateConstructRequest(params.id,form).subscribe(
        res => this.router.navigateByUrl(`/admin/request/construct/${params.id}`)
      );
    }else {
      // console.log('form',form)
      this.requestService.saveConstructRequest(form).subscribe(
        res => this.router.navigateByUrl(`/admin/request/construct`)
      );

    }
  }

  public get UserRole() {
    return UserRole;
  }

  public get ConstructType() {
    return RequestConstructType;
  }

  handleRes(res){
    // console.log('master log',res)
    // this.stFormGroup.get('user').setValue(res.user);
    // this.userPreview = res.user;
    // const skills: string[] = [];
    // res.construct.skills.map(value => skills.push(value.slug));
    // this.stFormGroup.get('skills').setValue(skills);
    // this.stFormGroup.controls['request'].get('approximateArea').setValue(res.approximateArea);
    // this.stFormGroup.controls['request'].get('address').setValue(res.address);
    // this.stFormGroup.controls['request'].get('houseNumber').setValue(res.houseNumber);
    // this.stFormGroup.controls['request'].get('description').setValue(res.description);
    // this.stFormGroup.controls['request'].get('isForce').setValue(res.isForce);
    // this.stFormGroup.controls['request'].get('serviceDate').setValue(res.serviceDate);
  }

}
