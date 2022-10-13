import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(value: any, name: string) {
    if (name === '') {
      return value;
    }
    return value.filter((employee) => employee.firstName.startsWith(name));
  }
}
