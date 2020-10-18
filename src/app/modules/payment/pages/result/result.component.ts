import { Component, OnInit } from '@angular/core';
import {PaymentService} from "../../../../core/services";
import {ActivatedRoute} from "@angular/router";
import {PaymentContext, PaymentStatus} from "../../../../core/models";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  result:PaymentContext;

  constructor(
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params.paymentId;
    this.paymentService.findOnePayment(params).subscribe(
      res => this.result = res
    )
  }

  public get paymentStatus(){
    return PaymentStatus
  }

}
