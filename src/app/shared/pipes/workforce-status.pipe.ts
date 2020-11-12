import { Pipe, PipeTransform } from '@angular/core';
import { WorkforceStatus } from '@app/core/models';

@Pipe({
  name: 'workforceStatus'
})
export class WorkforceStatusPipe implements PipeTransform {

  transform(value: any): string {
    switch (value) {
      case  WorkforceStatus.UNAVAILABLE:
        return 'غیر قابل دسترسی'
        break;
      case  WorkforceStatus.WORK:
        return 'مشغول'
        break;

      default:
        return 'آماده به کار'
        break;
    }
  }

}
