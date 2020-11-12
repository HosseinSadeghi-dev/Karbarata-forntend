import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {
  MasterCategoryContext,
  MasterSkillContext,
  ProfileContext,
  RequestContext,
  RequestMasterContext,
  UserRole
} from "@app/core/models";
import {RequestService, WorkforceService} from "@app/core/services";
import {isNumeric} from "rxjs/internal-compatibility";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  stFormGroup: FormGroup;
  data:MasterCategoryContext[] = [];
  todayDate = new Date();
  minDate = new Date();
  userPreview: ProfileContext;
  isEdit: boolean = false;

  constructor(
    private workForceService:WorkforceService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private requestService: RequestService
  ) { }


  ngOnInit() {
    this.minDate = new Date(this.todayDate.setDate(this.todayDate.getDate() + 1));

    const params = this.activatedRoute.snapshot.params;
    if (params.id && isNumeric(params.id)) {
      this.isEdit = true;
      this.requestService.findOneRequest(params.id).subscribe(
        res => this.handleRes(res)
      );
    }

    this.workForceService.findAllMasterCategory().subscribe(
      res => this.handleResData(res.results)
    );

    this.stFormGroup = this.formBuilder.group({
      skills: [[], [Validators.required,Validators.minLength(1)]],

      request: this.formBuilder.group({
        approximateArea: ['', Validators.required],
        address: ['', Validators.required],
        houseNumber: ['', Validators.required],
        description: [''],
        isForce: [],
        serviceDate: [''],
      }),

      user: ['',Validators.required],
    });
  }

  handleResData(res){
    this.data = res;
  }

  onSubmit(){
    const form = this.stFormGroup.value;
    const masterRequest : RequestMasterContext = {
      skills: form.skills,
      request: {
        address: form.request.address,
        approximateArea: form.request.approximateArea,
        houseNumber: form.request.houseNumber,
        description: form.request.description,
        isForce: form.request.isForce,
        serviceDate: form.request.serviceDate,
      },
      user: form.user,
    };
    const params = this.activatedRoute.snapshot.params;
    if (this.isEdit){
      this.requestService.updateMasterRequest(params.id,masterRequest).subscribe(
        res => this.router.navigateByUrl(`/admin/request/master/${params.id}`)
      );
    }else {
      this.requestService.saveMasterRequest(masterRequest).subscribe(
        res => this.router.navigateByUrl(`/admin/request/master`)
      );

    }
  }

  public get UserRole() {
    return UserRole;
  }

  handleRes(res){
    this.stFormGroup.get('user').setValue(res.user);
    this.userPreview = res.user;
    const skills: string[] = [];
    res.master.skills.map(value => skills.push(value.slug));
    this.stFormGroup.get('skills').setValue(skills);
    this.stFormGroup.controls['request'].get('approximateArea').setValue(res.approximateArea);
    this.stFormGroup.controls['request'].get('address').setValue(res.address);
    this.stFormGroup.controls['request'].get('houseNumber').setValue(res.houseNumber);
    this.stFormGroup.controls['request'].get('description').setValue(res.description);
    this.stFormGroup.controls['request'].get('isForce').setValue(res.isForce);
    this.stFormGroup.controls['request'].get('serviceDate').setValue(res.serviceDate);
  }



}
