import { Component, OnInit } from '@angular/core';
import { Helpers } from '@app/shared/helpers';
import { MasterCategoryContext, UserRole, UserStatus, WorkforceSimpleType } from '@app/core/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WorkforceService, UserService } from '@app/core/services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public readonly helper = new Helpers();
  isEdit: boolean = false;
  stFormGroup: FormGroup;
  roles = UserRole;
  typeWork = '';

  constructor(
    private workforceService: WorkforceService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.isEdit = true;
      this.userService
        .findOneUserSimple(params.id)
        .subscribe(res => this.handleResById(res));
    }
    this.stFormGroup = this.formBuilder.group({
      user: this.formBuilder.group({
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        email: [''],
        houseNumber: ['', Validators.required],
        address: ['', Validators.required],
        pid: ['', [Validators.required,Validators.maxLength(9999999999)]],
        phoneNumber: ['', [Validators.required,Validators.maxLength(9999999999)]],
        roles: [[UserRole.WORKER], Validators.minLength(1)],
        status: [{value: '', disabled: false}],
      }),
      type: ['', Validators.required],
      shared: this.formBuilder.group({
        shabaNumber: [''],
        exp: ['', Validators.required],
        isSmartPhone: [true]
      })
    });

  }

  handleResById(res){
    this.stFormGroup.controls['user'].get('name').setValue(res.user.name);
    this.stFormGroup.controls['user'].get('lastName').setValue(res.user.lastName);
    this.stFormGroup.controls['user'].get('email').setValue(res.user.email);
    this.stFormGroup.controls['user'].get('houseNumber').setValue(res.user.houseNumber);
    this.stFormGroup.controls['user'].get('address').setValue(res.user.address);
    this.stFormGroup.controls['user'].get('pid').setValue(res.user.pid);
    this.stFormGroup.controls['user'].get('phoneNumber').setValue(res.user.phoneNumber);
    this.stFormGroup.controls['user'].get('roles').setValue(res.user.roles);
    res.user.status == UserStatus.ACTIVATE
      ? this.stFormGroup.controls['user'].get('status').setValue(true)
      : this.stFormGroup.controls['user'].get('status').setValue(false);
    this.stFormGroup.get('shared.exp').setValue(res.shared.exp);
    this.stFormGroup.get('shared.shabaNumber').setValue(res.shared.shabaNumber);
    this.stFormGroup.get('shared.isSmartPhone').setValue(res.shared.isSmartPhone);
    this.stFormGroup.get('type').setValue(res.type)
  }

  onSubmit(){
    const form = this.stFormGroup.value;
    form.user.phoneNumber = Number(form.user.phoneNumber);
    form.user.status = form.user.status
      ? UserStatus.ACTIVATE
      : UserStatus.DEACTIVATE;
    form.type = this.typeWork == "daily"
      ? WorkforceSimpleType.DAILY
      : WorkforceSimpleType.CONTRACT;
    if (this.isEdit){
      const params = this.activatedRoute.snapshot.params;
      this.userService
        .updateUserSimple(params.id,form)
        .subscribe(res => this.handleRes())
    }else {
      this.userService
        .saveUserSimple(form)
        .subscribe(
          res => this.handleRes()
        )
    }
  }

  handleRes(){
    this.router.navigateByUrl('/admin/user/workforce/simple')
  }

  public get UserRole(){
    return UserRole;
  }
}
