import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'puntos',
  standalone: false,
})
export class PuntosPipe implements PipeTransform {
  transform(valor: number | string | null | undefined): string {
    if (valor === null || valor === undefined || valor === '') {
      return '0';
    }
    const num = Math.round(Number(valor));
    if (isNaN(num)) {
      return String(valor);
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}
