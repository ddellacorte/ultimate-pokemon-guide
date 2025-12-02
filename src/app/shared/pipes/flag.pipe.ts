import { Pipe, PipeTransform } from '@angular/core';
import { LANGUAGES } from '../utils/constants';

@Pipe({
  name: 'flag',
})
export class FlagPipe implements PipeTransform {
  transform(id: number): string {
    const lang = LANGUAGES.find((l) => l.id === id);
    if (!lang || !lang.flags.length) return '';

    // se vuoi mostrare solo la prima bandiera
    return lang.flags
      .map((code) => `<span class="fi fi-${code}"></span>`)
      .join(' ');
  }
}
