import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toString',
  standalone: true,
})
export class ToStringPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    return value.toString();
  }
}
