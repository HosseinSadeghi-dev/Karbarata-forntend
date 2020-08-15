import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {

  transform(data: Object) {
    return Object.values(data);
    // return keys.slice(keys.length / 2);
  }

}
