import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {RequestService} from "../../../../core/services";

@Component({
  selector: 'app-request-invoice-form',
  templateUrl: './request-invoice-form.component.html',
  styleUrls: ['./request-invoice-form.component.scss']
})
export class RequestInvoiceFormComponent implements OnInit {

  isEdit: boolean = false;
  stFormGroup: FormGroup;
  costTotal: number = 0;

  constructor(
    private requestService: RequestService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    public location: Location
  ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.stFormGroup = this.formBuilder.group({
      request: ['', Validators.required],
      statusStatements: [[], [Validators.required,Validators.minLength(1)]],
    });
    if (params.sid){
      this.requestService.findOneRequestInvoice(params.sid).subscribe(
        res => this.handleResById(res),
      )
    }
    if (params.id){
      this.stFormGroup.get('request').setValue(Number(params.id));
    }
    this.onCalcTotal()
  }

  handleResById(res){
    this.stFormGroup.get('request').setValue(res.request.id);
    this.stFormGroup.get('statusStatements').setValue(res.statusStatements);
  }

  onCalcTotal(){
    this.stFormGroup.get('statusStatements').valueChanges.subscribe(val => {
      this.costTotal = 0;
      this.stFormGroup.controls['statusStatements'].value.forEach(row => {
        const tax = row.tax;
        row.items.forEach(value => {
          this.costTotal = this.costTotal + Number(value.costTotal);
          this.costTotal = this.costTotal + (( tax * this.costTotal) / 100);
        })
      });
    });
  }

  onSubmit(){
    const form = this.stFormGroup.value;
    const params = this.activatedRoute.snapshot.params;
    if (params.sid){
      this.requestService.updateRequestInvoice(params.id, form).subscribe(
        res => this.location.back(),
      )
    }else {
      this.requestService.saveRequestInvoice(form).subscribe(
        res => this.location.back(),
      )
    }
  }

  getStatusStatement(e){
    this.stFormGroup.get('statusStatements').setValue(e);
  }

}
