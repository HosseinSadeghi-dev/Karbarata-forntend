import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserRequestService} from "@app/core/services";
import {RequestContact} from "@app/core/models";

@Component({
  selector: 'app-footer-form',
  templateUrl: './footer-form.component.html',
  styleUrls: ['./footer-form.component.scss']
})
export class FooterFormComponent implements OnInit {

  stFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userRequestService: UserRequestService
  ) { }

  ngOnInit() {
    this.stFormGroup = this.formBuilder.group({
      fullName: ['', Validators.required],
      contactWay: ['',[Validators.required]],
    });

  }

  onSubmit(){

    let form: RequestContact = {
      name: this.stFormGroup.get('fullName').value
    }

    if(this.stFormGroup.get('contactWay').value.includes('@')){
      form.email = this.stFormGroup.get('contactWay').value
    }
    else {
      form.phoneNumber = this.stFormGroup.get('contactWay').value
    }

    this.userRequestService.requestContact(form).
    subscribe( );
  }

}
