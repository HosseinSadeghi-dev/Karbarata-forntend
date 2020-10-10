import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MasterCategoryContext} from "@app/core/models";
import {UserRequestService, WorkforceService} from "../../../../core/services";

@Component({
  selector: 'app-cooperation',
  templateUrl: './cooperation.component.html',
  styleUrls: ['./cooperation.component.scss']
})
export class CooperationComponent implements OnInit {

  stFormGroup: FormGroup;
  categories: MasterCategoryContext[] = [];

  constructor(
    private workforceService: WorkforceService,
    private userRequestService: UserRequestService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.workforceService.findAllMasterCategory().subscribe(
      res => this.categories = res.results
    )

    this.stFormGroup = this.formBuilder.group({
      name: ['',Validators.required],
      phoneNumber: ['',Validators.required],
      experience: ['',Validators.required],
      field: ['',Validators.required],
      address: ['',Validators.required],
    })
  }

  onSubmit(){
    this.userRequestService.requestCooperate(this.stFormGroup.value).subscribe(

    )
  }

}
