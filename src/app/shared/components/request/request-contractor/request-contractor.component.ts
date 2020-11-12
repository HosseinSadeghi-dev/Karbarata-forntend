import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ProfileContext, UserRole} from "@app/core/models";
import {RequestService} from "@app/core/services";

@Component({
  selector: 'app-request-contractor',
  templateUrl: './request-contractor.component.html',
  styleUrls: ['./request-contractor.component.scss']
})
export class RequestContractorComponent implements OnInit {

  contractors: ProfileContext[] = [];
  stFormGroup: FormGroup;
  isView: boolean;
  isEdit: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private requestService: RequestService,
  ) { }

  ngOnInit(): void {
    this.stFormGroup = this.formBuilder.group({
      contractors: [[], [Validators.required]],
    });
    this.getContractors();
  }

  getContractors(){
    const params = this.activatedRoute.snapshot.params;
    if (params.id){
      this.requestService.findAllRequestContractor(params.id).subscribe(
        res => this.handleRes(res)
      )
    }
  }

  handleRes(res){
    res.length !== 0 && (this.isView = true);
    this.contractors = res;
    this.getContractor(this.contractors);
  }

  getContractor(e){
    this.contractors = e;
    const selectedUsers: string[] = [];
    this.contractors.forEach(row => selectedUsers.push(String(row.id)));
    this.stFormGroup.get('contractors').setValue(selectedUsers);
  }

  onSubmit(){
    const form = this.stFormGroup.value;
    const params = this.activatedRoute.snapshot.params;
    if (params.id){
      this.requestService.saveRequestContractor(params.id,form).subscribe(
        () => this.getContractors()
      )
    }
  }

  public get UserRole() {
    return UserRole;
  }

}
