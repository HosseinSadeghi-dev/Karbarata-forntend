import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {RequestService} from "@app/core/services";
import {RequestReportContext, RequestReportType} from "@app/core/models";
import {RequestReportDialogComponent} from "..";

@Component({
  selector: 'app-request-report',
  templateUrl: './request-report.component.html',
  styleUrls: ['./request-report.component.scss']
})
export class RequestReportComponent implements OnInit {

  reports: RequestReportContext[] = [];
  requestId: number;

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private requestService:RequestService
  ) { }

  ngOnInit(): void {
    this.getReports();
  }

  getReports(){
    const params = this.activatedRoute.snapshot.params;
    if (params.id){
      this.requestId = params.id;
      this.requestService.getRequestReportList(params.id).subscribe(
        res => this.reports = res,
      )
    }
  }

  openDialog(data){
    const dialogRef = this.dialog.open(RequestReportDialogComponent, {
      width: '600px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  public get ReportType() {
    return RequestReportType;
  }

}
