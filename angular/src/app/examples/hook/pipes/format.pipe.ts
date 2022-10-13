import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'format',
  // pure: false,
})
export class FormatPipe implements PipeTransform {
  transform(value: number): string {
    console.log('pipe');
    return value.toString().replace('.', ',');
  }
}
