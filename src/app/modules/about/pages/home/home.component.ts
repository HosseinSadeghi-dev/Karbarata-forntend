import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserRequestService} from "@app/core/services";
import {Router} from "@angular/router";
import {RequestContact} from "../../../../core/models";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  stFormGroup :FormGroup

  constructor(
   private formBuilder: FormBuilder,
   private userRequestService: UserRequestService,
   private router: Router
  ) { }

  ngOnInit() {
    this.stFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      contactWay: ['',Validators.required],
      description: ['',Validators.required],
      score: []
    });
  }

  onsubmit() {
    let form: RequestContact = {
      name: this.stFormGroup.get('name').value,
      description: this.stFormGroup.get('description').value,
      score: this.stFormGroup.get('score').value,
    }

    if(this.stFormGroup.get('contactWay').value.includes('@')){
      form.email = this.stFormGroup.get('contactWay').value
    }
    else {
      form.phoneNumber = this.stFormGroup.get('contactWay').value
    }

    this.userRequestService.requestContact(form).subscribe(
      () => this.router.navigateByUrl('/')
    )
  }


}
