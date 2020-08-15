import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from '../../../authentication.service';
import {CredentialsService} from '../../../credentials.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  public form = {
    name: null,
    lastName: null,
    email: null,
    password: null
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialService: CredentialsService
  ) {}

  ngOnInit(): void {
  }
  onSubmit(){
    this.authenticationService.onRegister(this.form).subscribe(res => this.handleRes(res))
  }
  handleRes(res){
    this.credentialService.setCredentials(res.accessToken);
    this.router.navigateByUrl('/')
  }

}
