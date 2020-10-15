import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatStepper} from "@angular/material/stepper";
import {RequestSimpleContext, WorkforceSimpleType} from "@app/core/models";
import { UserRequestService} from "@app/core/services";

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss']
})
export class SimpleComponent implements OnInit {

  minDate = new Date();
  stepIndex: number = 0;
  stFormGroup: FormGroup;
  simpleType = WorkforceSimpleType;
  constructor(
    private formBuilder: FormBuilder,
    private userRequestService: UserRequestService
  ) {}

  ngOnInit() {

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
    )

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
