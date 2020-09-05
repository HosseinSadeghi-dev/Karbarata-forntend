import { Component, OnInit } from '@angular/core';
import {RequestContext, RequestSimpleContext} from "@app/core/models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {RequestService} from "@app/core/services";

@Component({
  selector: 'app-request-cost',
  templateUrl: './request-cost.component.html',
  styleUrls: ['./request-cost.component.scss']
})
export class RequestCostComponent implements OnInit {

  data: RequestSimpleContext;
  costFormGroup: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private requestService: RequestService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.costFormGroup = this.formBuilder.group({
      cost: ['',Validators.required]
    });
    this.getRequest();
  }

  getRequest(){
    const params = this.activatedRoute.snapshot.params;
    console.log('param',params)
    if (params.id) {
      this.requestService.findOneRequest(params.id).subscribe(
        res => this.handleRes(res)
      );
    }
  }

  onSubmit(){
    console.log('cost',this.costFormGroup)
    const params = this.activatedRoute.snapshot.params;
    if (params.id){
      const form = this.costFormGroup.value;
      this.requestService.saveRequestSimpleCost(params.id, form).subscribe(
        res => this.getRequest()
      );
    }
  }

  handleRes(res){
    this.data = res.simple;
    if (this.data.cost) {
      this.costFormGroup.disable();
      this.costFormGroup.get('cost').setValue(this.data.cost);
    }
  }

  handleResSubmit(){
    this.getRequest();
  }

}
