import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserRequestService} from "../../../../core/services";
import {AdviceCategoryContext} from "../../../../core/models";
import {Router} from "@angular/router";

@Component({
  selector: 'app-price-advice',
  templateUrl: './price-advice.component.html',
  styleUrls: ['./price-advice.component.scss']
})
export class PriceAdviceComponent implements OnInit {

  stFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userRequestService: UserRequestService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.stFormGroup = this.formBuilder.group({
      description: ['',Validators.required],
      type: ['',Validators.required]
    })
  }

  onSubmit(){
    this.userRequestService.requestPriceAdvice(this.stFormGroup.value).subscribe(
      () => this.router.navigateByUrl('user/inbox')
    )
  }

  public get AdviceCategoryContext(){
    return AdviceCategoryContext;
  }

}
