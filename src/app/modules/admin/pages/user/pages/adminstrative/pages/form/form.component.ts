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
      this.userService.findUserById(params.id).subscribe(res => this.handleRes(res));
    }
    this.stFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['',Validators.required],
      email: ['', Validators.required],
      pid: ['', Validators.required],
      address: ['', Validators.required],
      houseNumber: ['', Validators.required],
      insuranceCode: ['',Validators.required],
      status: [{value: '', disabled: false}],
      roles: [[], [Validators.required,Validators.minLength(1)]],
    });
    console.log('form',this.stFormGroup)
  }


  onSubmit(){
    const form : UserAdminstrative = {
      insuranceCode: this.stFormGroup.get('insuranceCode').value,
      user: {
        name: this.stFormGroup.get('name').value,
        lastName: this.stFormGroup.get('lastName').value,
        phoneNumber: this.stFormGroup.get('phoneNumber').value,
        email: this.stFormGroup.get('email').value,
        pid: this.stFormGroup.get('pid').value,
        address: this.stFormGroup.get('address').value,
        houseNumber: this.stFormGroup.get('houseNumber').value,
        status: this.stFormGroup.get('status').value,
        roles: this.stFormGroup.get('roles').value
      }
    }

    form.user.status = form.user.status ? UserStatus.ACTIVATE : UserStatus.DEACTIVATE;

    console.log(form);

    if (this.isEdit){
      const params = this.activatedRoute.snapshot.params;
      this.userService.updateUser(params.id,form).subscribe(res => this.handleRes(res));
      this.router.navigateByUrl('/admin/user');
    }else {
      this.userService.saveUserAdminstrative(form).subscribe(res => this.handleRes(res) );
      this.router.navigateByUrl('/admin/user');
    }
  }

  handleRes(res) {

    this.stFormGroup.get('name').setValue(res.user.name);
    this.stFormGroup.get('lastName').setValue(res.user.lastName);
    this.stFormGroup.get('phoneNumber').setValue(res.user.phoneNumber);
    this.stFormGroup.get('address').setValue(res.user.address);
    this.stFormGroup.get('pid').setValue(res.user.pid);
    this.stFormGroup.get('houseNumber').setValue(res.user.houseNumber);
    this.stFormGroup.get('roles').setValue(res.user.roles);
    res.status == UserStatus.ACTIVATE ? this.stFormGroup.get('status').setValue(true) : this.stFormGroup.get('status').setValue(false);
  }

  public get UserStatus() {
    return UserStatus;
  }

  public get UserRole() {
    return UserRole;
  }

}

