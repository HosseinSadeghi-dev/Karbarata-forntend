import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserRequestService} from "../../../../core/services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-municipality',
  templateUrl: './municipality.component.html',
  styleUrls: ['./municipality.component.scss']
})
export class MunicipalityComponent implements OnInit {

  stFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userRequestService: UserRequestService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.stFormGroup = this.formBuilder.group({
      description: ['',Validators.required]
    })
  }

  onSubmit(){
    this.userRequestService.requestMunicipalService(this.stFormGroup.value).subscribe(
      () => this.router.navigateByUrl('user/inbox')
    )
  }

}
