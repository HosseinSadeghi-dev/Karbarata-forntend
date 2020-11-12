import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@env/environment';

@Pipe({
  name: 'srcImage'
})
export class SrcImagePipe implements PipeTransform {

  transform(value: string,
            arg?: string): string {
    const res = value && ( value.split(' ').join('%20') );
    switch(arg) {
      case 'user': {
        return res ? environment.serverUrl + '/upload/user/' + res : 'assets/image/user.svg';
      }
      case 'default': {
        return 'assets/image/image-loader.svg';
      }
      default: {
        return environment.serverUrl + '/upload/gallery/' + res;
      }
    }
  }

}
