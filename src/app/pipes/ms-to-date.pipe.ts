import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({
  name: 'msToDate'
})
export class MsToDatePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return moment(parseInt(value) * 1000).format('H:mm, DD.MM.YYYY');
  }

}
