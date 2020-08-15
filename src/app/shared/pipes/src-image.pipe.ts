import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@env/environment';

@Pipe({
  name: 'srcImage'
})
export class SrcImagePipe implements PipeTransform {

  transform(value: string,
            arg?: string): string {
    const res = value.split(' ').join('%20');
    switch(arg) {
      case 'user': {
        return environment.serverUrl + '/upload/user/' + res;
      }
      default: {
        return environment.serverUrl + '/upload/gallery/' + res;
      }
    }
  }

}
