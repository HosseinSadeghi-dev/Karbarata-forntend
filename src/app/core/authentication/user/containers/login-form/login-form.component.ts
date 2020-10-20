import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '@app/core/authentication/authentication.service';
import {CredentialsService} from '@app/core/authentication/credentials.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  public form = {
    phoneNumber:null
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialService: CredentialsService
  ) {}

  ngOnInit(): void {}

  onSubmit(){
    this.form.phoneNumber = String(this.form.phoneNumber);
    this.authenticationService.onLogin(this.form).subscribe(res => this.handleRes())
  }

  handleRes(){
    this.router.navigate(['/auth/verify'],{
      queryParams: {
        phone: this.form.phoneNumber
      }
    });
  }
}
