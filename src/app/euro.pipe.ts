import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'euro'
})
export class EuroPipe implements PipeTransform {
  transform(value: number): string {
    // Verificar si el valor es un número válido
    if (isNaN(value)) {
      return value.toString(); // Si no es un número válido, devuelve el valor original.
    }

    // Formatea el número con el símbolo de euro a la derecha
    return value.toFixed(2) + ' €';
  }
}
