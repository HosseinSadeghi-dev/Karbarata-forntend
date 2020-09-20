import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatStepper} from "@angular/material/stepper";
import {WorkforceSimpleType} from "@app/core/models";

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
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {


    this.stFormGroup = this.formBuilder.group({

      typeForm: this.formBuilder.group({
        type: ['', Validators.required ],
        quantity: ['', [Validators.required, Validators.min(1)] ],
      }),

      durationForm: this.formBuilder.group({
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
        serviceDate: ['', Validators.required]
      })

    })
  }
  log(stepper: MatStepper){
    console.log('stepper',stepper.selectedIndex)
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
