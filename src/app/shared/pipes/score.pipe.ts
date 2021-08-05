import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'score',
})
export class ScorePipe implements PipeTransform {
  transform(value: number): string {
    const isDisapproved = value >= 1 && value < 4;
    const isApproved = value >= 4 && value < 6;

    return isDisapproved
      ? 'desaprobado'
      : isApproved
      ? 'aprobado'
      : 'promocionado';
  }
}
