import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pathStringFilter'
})
export class PathStringFilterPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return;
    }
    return value
      .split('/')
      .join(' ')
      .toUpperCase();
  }
}
