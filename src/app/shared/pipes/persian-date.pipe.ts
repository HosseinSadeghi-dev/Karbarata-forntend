import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'persianDate'
})
export class PersianDatePipe implements PipeTransform {

  transform(value: string,
            arg?: string): string {
    switch(arg) {
      case 'fullTime': {
        return new Date(value).toLocaleDateString('fa-Ir',
          {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
            hour: '2-digit',
            minute: '2-digit'
          });
      }
      default: {
        return new Date(value).toLocaleDateString('fa-Ir');
      }
    }
  }

}
