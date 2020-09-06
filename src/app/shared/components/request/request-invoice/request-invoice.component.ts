import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PaymentMethod, PaymentStatus, RequestInvoiceContext} from "@app/core/models";
import {PaymentService, RequestService} from "@app/core/services";

@Component({
  selector: 'app-request-invoice',
  templateUrl: './request-invoice.component.html',
  styleUrls: ['./request-invoice.component.scss']
})
export class RequestInvoiceComponent implements OnInit {

  invoices: RequestInvoiceContext[] = [];
  paymentMethods = PaymentMethod;

  constructor(
    private activatedRoute: ActivatedRoute,
    private requestService: RequestService,
    private paymentService: PaymentService
    ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params.id){
      this.requestService.findOneRequestInvoiceList(params.id).subscribe(
        res =>  this.invoices = res
      )
    }
  }

  onPay(method: PaymentMethod, amount: number, invoice: number){
    this.paymentService.savePayment(invoice, {
      method: method,
      amount: String(amount)
    }).subscribe(
      res => window.location.href = res.message
    )
  }

  public get Method(){
    return PaymentMethod;
  }

  public get Status(){
    return PaymentStatus;
  }

}
