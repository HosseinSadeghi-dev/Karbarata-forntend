import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RequestReportContext, RequestReportType} from "@app/core/models";

@Component({
  selector: 'app-request-report-dialog',
  templateUrl: './request-report-dialog.component.html',
  styleUrls: ['./request-report-dialog.component.scss']
})
export class RequestReportDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RequestReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RequestReportContext,
    ) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public get ReportType() {
    return RequestReportType;
  }

}
