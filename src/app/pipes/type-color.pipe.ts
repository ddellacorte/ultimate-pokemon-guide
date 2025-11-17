import { Pipe, PipeTransform } from '@angular/core';
import { TYPE_COLORS } from '../constants';

@Pipe({
  name: 'typeColor'
})
export class TypeColorPipe implements PipeTransform {
  transform(type: string): string {
    return TYPE_COLORS[type.toLowerCase()] || '#777'; // fallback grigio se non esiste
  }
}
