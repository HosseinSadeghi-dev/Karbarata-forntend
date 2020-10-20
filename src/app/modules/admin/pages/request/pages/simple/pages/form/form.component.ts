import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {isNumeric} from "rxjs/internal-compatibility";
import {ProfileContext, RequestContext, RequestSimpleContext, UserRole, WorkforceSimpleType} from "@app/core/models";
import {RequestService} from "@app/core/services";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  todayDate = new Date();
  minDate = new Date();
  stFormGroup: FormGroup;
  simpleType = WorkforceSimpleType;
  userPreview: ProfileContext;
  isEdit: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private requestService: RequestService
  ) { }

  ngOnInit(): void {
    this.minDate = new Date(this.todayDate.setDate(this.todayDate.getDate() + 1));

    const params = this.activatedRoute.snapshot.params;
    if (params.id && isNumeric(params.id)) {
      this.isEdit = true;
      this.requestService.findOneRequest(params.id).subscribe(
        res => this.handleRes(res)
      );
    }
    this.stFormGroup = this.formBuilder.group({

      userForm: this.formBuilder.group({
        user: ['',Validators.required]
      }),

      typeForm: this.formBuilder.group({
        type: ['', Validators.required ],
        quantity: ['', [Validators.required, Validators.min(1)] ],
      }),

      durationForm: this.formBuilder.group({
        duration: ['', [Validators.required, Validators.min(1)] ],
      }),

      locationForm: this.formBuilder.group({
        approximateArea: ['', Validators.required],
        address: ['', Validators.required],
        houseNumber: ['', Validators.required],
      }),

      confirmForm: this.formBuilder.group({
        description: [''],
        isForce: [false],
        serviceDate: ['']
      })

    })

  }

  onSubmit(){
    const form = this.stFormGroup.value;

    if(form.durationForm.duration > 6){
      form.typeForm.type = this.simpleType.CONTRACT
    }

    const simpleRequest: RequestSimpleContext = {
      request: {
        address: form.locationForm.address,
        approximateArea: form.locationForm.approximateArea,
        houseNumber: form.locationForm.houseNumber,
        description: form.confirmForm.description,
        isForce: form.confirmForm.isForce,
        serviceDate: form.confirmForm.serviceDate,
      },
      type: form.typeForm.type,
      quantity: form.typeForm.quantity,
      duration: form.durationForm.duration,
      user: form.userForm.user,
    }

    if (this.isEdit){
      const params = this.activatedRoute.snapshot.params;
      this.requestService.updateSimpleRequest(params.id,simpleRequest).subscribe(
        res => this.router.navigateByUrl(`/admin/request/simple/${params.id}`)
      );

    }else {
      this.requestService.saveSimpleRequest(simpleRequest).subscribe(
        res => this.router.navigateByUrl('/admin/request/simple')
      );

    }

  }

  public get UserRole() {
    return UserRole;
  }

  handleRes(res){
    this.stFormGroup.controls['userForm'].get('user').setValue(res.user);
    this.userPreview = res.user;
    this.stFormGroup.controls['typeForm'].get('type').setValue(res.simple.type);
    this.stFormGroup.controls['typeForm'].get('quantity').setValue(res.simple.quantity);
    this.stFormGroup.controls['durationForm'].get('duration').setValue(res.simple.duration);
    this.stFormGroup.controls['locationForm'].get('approximateArea').setValue(res.approximateArea);
    this.stFormGroup.controls['locationForm'].get('address').setValue(res.address);
    this.stFormGroup.controls['locationForm'].get('houseNumber').setValue(res.houseNumber);
    this.stFormGroup.controls['confirmForm'].get('description').setValue(res.description);
    this.stFormGroup.controls['confirmForm'].get('isForce').setValue(res.isForce);
    this.stFormGroup.controls['confirmForm'].get('serviceDate').setValue(res.serviceDate);

  }

}
