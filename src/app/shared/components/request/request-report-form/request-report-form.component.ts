import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {RequestReportType} from "@app/core/models";
import {RequestService} from "@app/core/services";

@Component({
  selector: 'app-request-report-form',
  templateUrl: './request-report-form.component.html',
  styleUrls: ['./request-report-form.component.scss']
})
export class RequestReportFormComponent implements OnInit {

  stFormGroup: FormGroup;
  reportTypes = RequestReportType;

  constructor(
    private formBuilder: FormBuilder,
    private requestService: RequestService,
    private activatedRoute: ActivatedRoute,
    private bottomSheetRef: MatBottomSheetRef<RequestReportFormComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public id: number
  ) { }

  ngOnInit(): void {
    this.stFormGroup = this.formBuilder.group({
      title: [''],
      type: ['', Validators.required],
      body: ['', Validators.required]
    });
    this.typeValueChanged();
  }

  typeValueChanged() {
    const titleControl = this.stFormGroup.get('title');
    this.stFormGroup.get('type').valueChanges.subscribe(
      (mode: RequestReportType) => {
        if (mode === this.ReportType.OTHER) {
          titleControl.enable();
          titleControl.setValidators([Validators.required]);
        } else {
          titleControl.disable();
          titleControl.clearValidators();
        }
        titleControl.updateValueAndValidity();
      });
  }

  onSubmit(){
    const form = this.stFormGroup.value;
    this.requestService.saveRequestReport(this.id,form).subscribe(
      res => this.handleResSubmit()
    )
  }
  handleResSubmit(){
    this.stFormGroup.reset();
    this.bottomSheetRef.dismiss(true);
  }

  public get ReportType() {
    return RequestReportType;
  }

}
