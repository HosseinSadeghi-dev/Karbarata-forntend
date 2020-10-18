import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  bhLink: string = "https://bpm.shaparak.ir/pgwchannel/payment.mellat?RefId="
  refId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.refId = this.activatedRoute.snapshot.params.refId;
    this.init(this.refId)
  }

  init(refId){
    setTimeout(() => {
      document.location.href = this.bhLink + refId;
    },3000)
  }

}
