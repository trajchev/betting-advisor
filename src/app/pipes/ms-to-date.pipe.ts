import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'msToDate'
})
export class MsToDatePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return new Date(+value);
  }

}
