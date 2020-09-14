import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WorkforceSimpleType} from "../../../../core/models";

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss']
})
export class SimpleComponent implements OnInit {

  minDate = new Date();
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


}
