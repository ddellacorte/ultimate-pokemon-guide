import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padNumber',
})
export class PadNumberPipe implements PipeTransform {
  transform(value: number, length: number = 4): string {
    if (value == null) return '';
    // Trasforma il numero in stringa e aggiunge zeri iniziali
    return value.toString().padStart(length, '0');
  }
}
