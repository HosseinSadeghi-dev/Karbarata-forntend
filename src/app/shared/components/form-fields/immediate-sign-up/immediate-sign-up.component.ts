import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "@app/core/authentication/authentication.service";
import {CredentialsService} from "@app/core/authentication/credentials.service";
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

interface form{
  name: string,
  lastName: string,
  phoneNumber: string,
  email?: string
}

@Component({
  selector: 'app-immediate-sign-up',
  templateUrl: './immediate-sign-up.component.html',
  styleUrls: ['./immediate-sign-up.component.scss']
})
export class ImmediateSignUpComponent implements OnInit {

  first: boolean = true;
  login: boolean = false;
  public verify = {
    phoneNumber: null,
    password: null
  };

  stFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private dialogRef: MatDialogRef<ImmediateSignUpComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.stFormGroup = this.formBuilder.group({
      name: ['',Validators.required],
      lastName: ['',Validators.required],
      phoneNumber: ['',Validators.required],
      email: [''],
    })
  }

  onSubmit(){
    let form: form = {
      name : this.stFormGroup.value.name,
      lastName : this.stFormGroup.value.lastName,
      phoneNumber : this.stFormGroup.value.phoneNumber,
    };

    if(this.stFormGroup.value.email)
      form.email = this.stFormGroup.value.email

    this.authenticationService.onRegister(form).subscribe(
      res => this.handleSignUp(res)
    )
  }

  handleSignUp(res){
    this.verify.phoneNumber = this.stFormGroup.value.phoneNumber;
    this.credentialsService.setCredentials(res.accessToken);
    this.login = true
  }

  onVerify(){
    if (this.verify.password !== null && this.verify.password.toString().length == 4)
      this.authenticationService.onVerify(this.verify).subscribe(
        res => this.handleRes(res)
      )
  }

  onResend(){
    this.authenticationService.onLogin({
      phoneNumber: this.stFormGroup.value.phoneNumber
    });

  }

  handleRes(res){
    console.log('res',res)
    this.credentialsService.setCredentials(res.accessToken);
    this.onNoClick();
  }

  onNoClick(): void {
    this.snackBar.open("ثبت نام شما با موفقیت انجام شد ، با تشکر", '', {
      duration: 2000,

    })
    this.dialogRef.close();
  }
}
