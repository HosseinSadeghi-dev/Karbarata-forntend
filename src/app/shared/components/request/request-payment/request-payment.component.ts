import {Component, Inject, OnInit} from '@angular/core';
import {PaymentContext, PaymentMethod, PaymentStatus} from "../../../../core/models";
import {MAT_BOTTOM_SHEET_DATA} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-request-payment',
  templateUrl: './request-payment.component.html',
  styleUrls: ['./request-payment.component.scss']
})
export class RequestPaymentComponent implements OnInit {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: PaymentContext
  ) { }

  ngOnInit(): void {
  }

  public get Method(){
    return PaymentMethod;
  }

  public get Status(){
    return PaymentStatus;
  }

}
