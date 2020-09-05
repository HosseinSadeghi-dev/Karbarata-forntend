import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {RequestReportFormComponent} from "@app/shared/components/request/request-report-form/request-report-form.component";

@Directive({
  selector: '[appRequestReportForm]'
})
export class RequestReportFormDirective {
  @Output() private reportUpdated = new EventEmitter();
  @Input() private reqId: number;
  constructor(
    private bottomSheet: MatBottomSheet
  ) { }

  @HostListener('click') onClick(){
    const bottomSheetRef = this.bottomSheet.open(RequestReportFormComponent,
      {data: this.reqId});
    bottomSheetRef.afterDismissed().subscribe((e) => {
      e && (this.reportUpdated.emit(true));
      console.log('Bottom sheet has been dismissed.');
    });
  }
}
