import { Component, OnInit } from '@angular/core';
import {RequestStatusStatementContext, StatusStatementType} from "@app/core/models";
import {ActivatedRoute} from "@angular/router";
import {RequestService} from "../../../../core/services";

@Component({
  selector: 'app-request-statement',
  templateUrl: './request-statement.component.html',
  styleUrls: ['./request-statement.component.scss']
})
export class RequestStatementComponent implements OnInit {

  statusStatements: RequestStatusStatementContext[] = [];

  constructor(
    private requestService: RequestService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params.id){
      // this.requestService.getRequestStatusStatementListById(params.id).subscribe(
      //   res => this.statusStatements = res,
      // )
    }
  }

  public get StatusStatementType() {
    return StatusStatementType;
  }

}
