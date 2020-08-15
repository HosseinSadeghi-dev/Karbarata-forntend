import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../authentication.service';
import {CredentialsService} from '../../../credentials.service';
import {Helpers} from '@app/shared/helpers';

@Component({
  selector: 'app-verify-form',
  templateUrl: './verify-form.component.html',
  styleUrls: ['./verify-form.component.scss']
})
export class VerifyFormComponent implements OnInit {
  public readonly helpers = new Helpers();
  public form = {
    phoneNumber: null,
    password: null
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (Object.keys(params).length === 0){
        this.router.navigate(['/user/auth/login'])
      }else {
        this.form.phoneNumber = params.phone;
      }
    });
  }
  onSubmit(){
    if (this.form.password !== null && this.form.password.toString().length == 4){
      this.authenticationService.onVerify(this.form).
      subscribe(res => this.handleRes(res))
    }
  }
  handleRes(res){
    this.credentialsService.setCredentials(res.accessToken);
    this.router.navigate(['/'])
  }

  onResendCode(){
    this.authenticationService.onLogin({
      phoneNumber: this.form.phoneNumber
    });
  }


}
