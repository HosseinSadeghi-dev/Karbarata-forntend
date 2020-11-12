import { Pipe, PipeTransform } from '@angular/core';
import { WorkforceSimpleType } from '@app/core/models';

@Pipe({
  name: 'simpleWorkerEnum'
})
export class SimpleWorkerEnum implements PipeTransform {

  transform(data: Object): string {
    return data == WorkforceSimpleType.CONTRACT
      ? 'قراردادی'
      : 'روزمزد';
  }

}
