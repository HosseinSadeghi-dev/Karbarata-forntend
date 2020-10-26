import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserRequestService} from "../../../../core/services";
import {AdviceCategoryContext} from "../../../../core/models";
import {Router} from "@angular/router";
import {ImmediateSignUpComponent} from "../../../../shared/components/form-fields/immediate-sign-up/immediate-sign-up.component";
import {CredentialsService} from "../../../../core/authentication/credentials.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-price-advice',
  templateUrl: './price-advice.component.html',
  styleUrls: ['./price-advice.component.scss']
})
export class PriceAdviceComponent implements OnInit {

  stFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userRequestService: UserRequestService,
    private router: Router,
    private credentialsService: CredentialsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.stFormGroup = this.formBuilder.group({
      description: ['',Validators.required],
      type: ['',Validators.required]
    })
  }

  onSubmit(){
    if( this.credentialsService.isAuthenticated()){
      this.userRequestService.requestPriceAdvice(this.stFormGroup.value).subscribe(
        () => this.router.navigateByUrl('user/inbox')
      )
    }
    else {
      this.openSignUpDialog();
    }

  }

  openSignUpDialog(){
    const dialogRef = this.dialog.open(ImmediateSignUpComponent,{
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public get AdviceCategoryContext(){
    return AdviceCategoryContext;
  }

}
