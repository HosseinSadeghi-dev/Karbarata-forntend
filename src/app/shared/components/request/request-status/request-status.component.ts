import { Component, OnInit } from '@angular/core';
import {RequestStatusContext, RequestStatusType} from "@app/core/models";
import {ActivatedRoute} from "@angular/router";
import {RequestService} from "../../../../core/services";

@Component({
  selector: 'app-request-status',
  templateUrl: './request-status.component.html',
  styleUrls: ['./request-status.component.scss']
})
export class RequestStatusComponent implements OnInit {

  data: RequestStatusContext[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private requestService: RequestService
  ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params.id){
      this.requestService.getRequestStatusListById(params.id).subscribe(
        res => this.handleRes(res)
      )
    }
  }

  handleRes(res){
    this.data = res
  }

  public get StatusType() {
    return RequestStatusType;
  }

}
