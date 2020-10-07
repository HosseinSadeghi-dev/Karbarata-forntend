import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  stFormGroup :FormGroup

  constructor(
   private formBuilder: FormBuilder

  ) { }

  ngOnInit() {
    this.stFormGroup = this.formBuilder.group({
      fullName: ['', Validators.required],
      contactWay: ['',Validators.required],
      description: ['',Validators.required]
    });
  }

  onsubmit(){}

}
