import {Directive, HostListener, Input} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {PaymentContext} from "@app/core/models";
import {RequestPaymentComponent} from "@app/shared/components/request/request-payment/request-payment.component";

@Directive({
  selector: '[appRequestPaymentBottomSheet]'
})
export class RequestPaymentBottomSheetDirective {

  @Input() data: PaymentContext;

  constructor(private bottomSheet: MatBottomSheet) { }

  @HostListener('click') onClick() {
    const bottomSheetRef = this.bottomSheet.open(RequestPaymentComponent, {
      data: this.data
    });

  }

}
