import {Directive, HostListener} from '@angular/core';
import {Location} from '@angular/common';

@Directive({
  selector: '[appCancel]'
})
export class CancelDirective {

  constructor(private location: Location) { }

  @HostListener('click') onClick() {
    this.location.back();
  }

}
