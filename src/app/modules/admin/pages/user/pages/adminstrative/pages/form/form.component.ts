import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "@app/core/services";
import {ProfileContext, UserAdminstrative, UserRole, UserStatus} from "@app/core/models";
import {isNumeric} from "rxjs/internal-compatibility";
import {Helpers} from "@app/shared/helpers";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public readonly helper = new Helpers();
  public isEdit: boolean = false;
  public status: UserStatus;
  stFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router)
  {}

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params.id && isNumeric(params.id)) {
      this.isEdit = true;
      this.userService.findOneAdminstrative(params.id).subscribe(res => this.handleRes(res));
    }
    this.stFormGroup = this.formBuilder.group({

      user: this.formBuilder.group({
        status: [{value: '', disabled: false}],
        roles: [[], [Validators.required,Validators.minLength(1)]],
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        phoneNumber: ['',Validators.required],
        email: ['', Validators.required],
        pid: ['', Validators.required],
        address: ['', Validators.required],
        houseNumber: ['', Validators.required],
      }),
      insuranceCode: [,Validators.required],

    });
    console.log('form',this.stFormGroup)
  }


  onSubmit(){
    const form = this.stFormGroup.value

    form.user.status = form.user.status ? UserStatus.ACTIVATE : UserStatus.DEACTIVATE;

    console.log(form);

    if (this.isEdit){
      const params = this.activatedRoute.snapshot.params;
      this.userService.updateUserAdminstrative(params.id,form).
      subscribe(res => this.router.navigateByUrl('/admin/user/adminstrative'));

    }else {
      this.userService.createUserAdminstrative(form).
      subscribe(res => this.router.navigateByUrl('/admin/user/adminstrative') );
    }
  }

  handleRes(res) {
    console.log('res',res)
    this.stFormGroup.get('user').get('name').setValue(res.user.name);
    this.stFormGroup.get('user').get('lastName').setValue(res.user.lastName);
    this.stFormGroup.get('user').get('phoneNumber').setValue(res.user.phoneNumber);
    this.stFormGroup.get('user').get('email').setValue(res.user.email);
    this.stFormGroup.get('user').get('address').setValue(res.user.address);
    this.stFormGroup.get('user').get('pid').setValue(res.user.pid);
    this.stFormGroup.get('user').get('houseNumber').setValue(res.user.houseNumber);
    this.stFormGroup.get('user').get('roles').setValue(res.user.roles);
    this.stFormGroup.get('insuranceCode').setValue(res.insuranceCode);
    res.user.status == UserStatus.ACTIVATE ? this.stFormGroup.get('user').get('status').setValue(true) : this.stFormGroup.get('user').get('status').setValue(false);
  }

  public get UserStatus() {
    return UserStatus;
  }

  public get UserRole() {
    return UserRole;
  }

}

