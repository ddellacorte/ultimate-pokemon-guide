import { Pipe, PipeTransform } from '@angular/core';
import { TYPES } from '../utils/constants';

@Pipe({
  name: 'typeColor',
})
export class TypeColorPipe implements PipeTransform {
  transform(type: string): string {
    const matchedType = TYPES.find((t) => t.name === type.toLowerCase());
    return matchedType ? matchedType.color : '#777'; // fallback grigio se non esiste
  }
}
