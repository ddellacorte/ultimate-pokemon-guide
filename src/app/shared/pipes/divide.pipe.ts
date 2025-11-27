import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'divide',
})
export class DividePipe implements PipeTransform {
  transform(value: number, divisor: number = 1): string {
    if (value == null || isNaN(value)) return '';
    const result = value / divisor;
    return result.toLocaleString('en-US', { minimumFractionDigits: 1 });
  }
}
