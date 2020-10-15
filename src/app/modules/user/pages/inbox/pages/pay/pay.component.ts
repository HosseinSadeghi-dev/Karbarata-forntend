import { Component, OnInit } from '@angular/core';
import {PaymentService, RequestService, UserRequestService} from "@app/core/services";
import {ActivatedRoute, Router} from "@angular/router";
import {PaymentMethod, PaymentStatus, RequestInvoiceContext} from "@app/core/models";

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

  invoices: RequestInvoiceContext[] = [];

  constructor(
    private requestService: RequestService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userRequestService: UserRequestService
  ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params

    this.requestService.findOneRequestInvoiceList(params.id).subscribe(
      res => this.invoices = res
    )
  }

  onPay(invoice:RequestInvoiceContext){

    const params = this.activatedRoute.snapshot.params
    const a: string = '/payment/transfer';

    if (params.id){
      this.userRequestService.userPayment({
        method: PaymentMethod.GATEWAY,
        amount: invoice.costTotal,
      },invoice.id).subscribe(
        res => this.router.navigateByUrl(a)
      )
    }
  }

  public get Status(){
    return PaymentStatus;
  }
}
