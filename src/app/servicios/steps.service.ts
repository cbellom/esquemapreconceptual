import {Injectable} from '@angular/core';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class StepsDataService extends DataService<Object[]> {

  protected initialize() {
    this.setData(this.getSteps());
  }
  getSteps(): any[] {
    return [
      {
        name: 'crear-proyecto',
        items: [
          '1. Seleccione el miembro que creará el proyecto',
          '2. Asigne un nombre al proyecto'
        ]
      },
      {
        name: 'crear-sprint',
        items: [
          '1. Seleccione el proyecto al que se le asignará el nuevo sprint',
          '2. Seleccione el miembro que creará el sprint',
          '3. Asigne las fechas de inicio y fin para el sprint a crear'
        ]
      },
      {
        name: 'crear-historia-usuario',
        items: [
          '1. Seleccione el proyecto al que se le asignará la nueva historia de usuario',
          '2. Seleccione el miembro que creará la historia de usuario',
          '3. Asigne los campos descripción y tamaño para la historia de usuario a crear'
        ]
      },
      {
        name: 'asignar-historia-usuario',
        items: [
          '1. Seleccione el proyecto donde se encuentra la historia de usuario',
          '2. Seleccione el miembro al que se le asignará la histotia de usuario',
          '3. Seleccione la historia de usuario que será asignada'
        ]
      },
      {
        name: 'desarrollar-historia-usuario',
        items: [
          '1. Seleccione el proyecto donde se encuentra la historia de usuario',
          '2. Seleccione el sprint que se quiere trabajar',
          '3. Seleccione la historia de usuario que se desarrollará',
          '4. Indique el número de puntos trabajados de la historia durante el sprint(tamaño) en el Sprint Backlog'
        ]
      }
    ];
  }
}
