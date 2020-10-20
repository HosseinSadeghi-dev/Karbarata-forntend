import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from '../../../authentication.service';
import {CredentialsService} from '../../../credentials.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  stFormGroup: FormGroup;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialService: CredentialsService,
    private formBuilder: FormBuilder
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
    this.authenticationService.onRegister(this.stFormGroup.value).subscribe(
      res => this.handleRes(res)
    )
  }

  handleRes(res){
    this.credentialService.setCredentials(res.accessToken);
    this.router.navigate(['/auth/verify'],{
      queryParams: {
        phone: this.stFormGroup.value.phoneNumber
      }
    });
  }

}
