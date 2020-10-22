import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserRequestService} from "@app/core/services";
import {ActivatedRoute, Router} from "@angular/router";
import {MatStepper} from "@angular/material/stepper";
import {RequestConstructContext} from "@app/core/models";
import {MatDialog} from "@angular/material/dialog";
import {CredentialsService} from "../../../../../../core/authentication/credentials.service";
import {ImmediateSignUpComponent} from "../../../../../../shared/components/form-fields/immediate-sign-up/immediate-sign-up.component";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  slug: string;
  todayDate = new Date();
  minDate = new Date();
  stepIndex: number = 0;
  stFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userRequestService: UserRequestService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private credentialsService: CredentialsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.minDate = new Date(this.todayDate.setDate(this.todayDate.getDate() + 1));

    this.slug = this.activatedRoute.snapshot.params.slug;

    this.stFormGroup = this.formBuilder.group({

      typeForm: this.formBuilder.group({
        type: ['',Validators.required],
        construct: ['']
      }),

      locationForm: this.formBuilder.group({
        approximateArea: ['', Validators.required],
        address: ['', Validators.required],
        houseNumber: ['', Validators.required],
      }),

      confirmForm: this.formBuilder.group({
        description: [''],
        isForce: [false],
        serviceDate: ['']
      })

    })

  }

  onSubmit(){

    if( this.credentialsService.isAuthenticated()){
      this.stFormGroup.controls['typeForm'].get('construct').setValue(this.slug);
      const temp = this.stFormGroup.value

      const form: RequestConstructContext = {
        construct: temp.typeForm.construct,
        type: temp.typeForm.type,
        request: {
          approximateArea: temp.locationForm.approximateArea,
          address: temp.locationForm.address,
          houseNumber: temp.locationForm.houseNumber,
          description: temp.confirmForm.description,
          isForce: temp.confirmForm.isForce,
          serviceDate: temp.confirmForm.serviceDate,
        }
      }

      this.userRequestService.requestConstruct(form).subscribe(
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

  nextStep(stepper: MatStepper){
    stepper.next();
    this.stepIndex = stepper.selectedIndex;
  }
  prevStep(stepper: MatStepper){
    stepper.previous();
    this.stepIndex = stepper.selectedIndex;
  }
}
