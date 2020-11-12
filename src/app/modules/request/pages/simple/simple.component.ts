import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatStepper} from "@angular/material/stepper";
import {RequestSimpleContext, WorkforceSimpleType} from "@app/core/models";
import { UserRequestService} from "@app/core/services";
import {Router} from "@angular/router";
import {CredentialsService} from "@app/core/authentication/credentials.service";
import {MatDialog} from "@angular/material/dialog";
import {ImmediateSignUpComponent} from "@app/shared/components/form-fields/immediate-sign-up/immediate-sign-up.component";

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss']
})
export class SimpleComponent implements OnInit {

  todayDate = new Date();
  minDate = new Date();

  stepIndex: number = 0;
  stFormGroup: FormGroup;
  simpleType = WorkforceSimpleType;
  constructor(
    private formBuilder: FormBuilder,
    private userRequestService: UserRequestService,
    private router: Router,
    private credentialsService: CredentialsService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {

    this.minDate = new Date(this.todayDate.setDate(this.todayDate.getDate() + 1));

    this.stFormGroup = this.formBuilder.group({

      typeForm: this.formBuilder.group({
        type: ['', Validators.required ],
        quantity: ['', [Validators.required, Validators.min(1)] ],
        duration: ['', [Validators.required, Validators.min(1)] ],
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

    if( this.credentialsService.isAuthenticated())
    {
      const form :RequestSimpleContext = {
        type: this.stFormGroup.controls['typeForm'].get('type').value,
        quantity: this.stFormGroup.controls['typeForm'].get('quantity').value,
        duration: this.stFormGroup.controls['typeForm'].get('duration').value,
        request: {
          approximateArea: this.stFormGroup.controls['locationForm'].get('approximateArea').value,
          address: this.stFormGroup.controls['locationForm'].get('address').value,
          houseNumber: this.stFormGroup.controls['locationForm'].get('houseNumber').value,
          description: this.stFormGroup.controls['confirmForm'].get('description').value,
          isForce: this.stFormGroup.controls['confirmForm'].get('isForce').value,
          serviceDate: this.stFormGroup.controls['confirmForm'].get('serviceDate').value,
        }
      }

      this.userRequestService.requestSimple(form).subscribe(
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
