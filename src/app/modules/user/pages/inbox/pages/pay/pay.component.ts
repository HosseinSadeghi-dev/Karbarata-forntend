import { Component, OnInit } from '@angular/core';
import {RequestService} from "@app/core/services";
import {ActivatedRoute, Router} from "@angular/router";
import {RequestContext, RequestInvoiceContext} from "@app/core/models";

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
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params

    this.requestService.findOneRequestInvoiceList(params.id).subscribe(
      res => this.invoices = res
    )
  }

}
