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
  data: MasterCategoryContext[] = [];
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
    this.workforceService
      .findAllMasterCategory()
      .subscribe(res => this.data = res)
  }

  handleResById(res){
    this.stFormGroup.get('user.name').patchValue(res.user.name);
    this.stFormGroup.get('user.lastName').patchValue(res.user.lastName);
    this.stFormGroup.get('user.email').patchValue(res.user.email);
    this.stFormGroup.get('user.houseNumber').patchValue(res.user.houseNumber);
    this.stFormGroup.get('user.address').patchValue(res.user.address);
    this.stFormGroup.get('user.pid').patchValue(res.user.pid);
    this.stFormGroup.get('user.phoneNumber').patchValue(res.user.phoneNumber);
    this.stFormGroup.get('user.roles').patchValue(res.user.roles);
    res.user.status == UserStatus.ACTIVATE
      ? this.stFormGroup.get('user.status').patchValue(true)
      : this.stFormGroup.get('user.status').patchValue(false);
    this.stFormGroup.get('shared.exp').patchValue(res.shared.exp);
    this.stFormGroup.get('shared.shabaNumber').patchValue(res.shared.shabaNumber);
    this.stFormGroup.get('shared.isSmartPhone').patchValue(res.shared.isSmartPhone);
    this.stFormGroup.get('type').patchValue(res.type)
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
