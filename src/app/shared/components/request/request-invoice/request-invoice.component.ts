import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PaymentMethod, PaymentStatus, ProfileContext, RequestInvoiceContext} from "@app/core/models";
import {PaymentService, RequestService} from "@app/core/services";

export interface payOff{
  user: ProfileContext,
  invoice: RequestInvoiceContext
}

@Component({
  selector: 'app-request-invoice',
  templateUrl: './request-invoice.component.html',
  styleUrls: ['./request-invoice.component.scss']
})
export class RequestInvoiceComponent implements OnInit {

  invoices: RequestInvoiceContext[] = [];
  params: any

  constructor(
    private activatedRoute: ActivatedRoute,
    private requestService: RequestService,
    private paymentService: PaymentService
    ) { }

  ngOnInit(): void {
    this.params = this.activatedRoute.snapshot.params;
    if (this.params.id){
      this.requestService.findOneRequestInvoiceList(this.params.id).subscribe(
        res =>  this.invoices = res
      )
    }
    console.log('invoices',this.invoices)
  }

  onPay(invoice){

    if (this.params.id){
      this.requestService.findOneRequest(this.params.id).subscribe(
        res => {
          this.paymentService.savePayment(
            {
              user: res.user,
              requestId: res.id,
              invoiceId: invoice.id
            }
          ).subscribe(
            res => console.log(res)
          )
        }
      )
    }


  }

  public get Method(){
    return PaymentMethod;
  }

  public get Status(){
    return PaymentStatus;
  }

}
