import { Pipe, PipeTransform } from '@angular/core';
import { Quarters } from 'src/app/constants/quarter';

@Pipe({
  name: 'quarter',
})
export class QuarterPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case Quarters.FIRST:
        return 'primer cuatrimestre';

      case Quarters.SECOND:
        return 'segundo cuatrimestre';

      case Quarters.THIRD:
        return 'tercer cuatrimestre';

      case Quarters.FOURTH:
        return 'cuarto cuatrimestre';

      case Quarters.FIFTH:
        return 'quinto cuatrimestre';

      case Quarters.SIXTH:
        return 'sexto cuatrimestre';

      default:
        return '';
    }
  }
}
