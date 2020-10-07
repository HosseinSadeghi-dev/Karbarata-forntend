import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.scss']
})
export class ComplaintComponent implements OnInit {
  stformGroup: FormGroup;

  constructor(
    private formBuilder:FormBuilder
  ) { }

  ngOnInit() {
    this.stformGroup = this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: ['',Validators.required],
      description: ['',Validators.required]
    })
  }

  onSubmit(){

  }

}
