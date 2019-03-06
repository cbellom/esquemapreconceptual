import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {Proyecto} from '../modelos/proyecto';
import {Sprint} from '../modelos/sprint';
import {SprintBacklog} from '../modelos/sprint-backlog';

@Injectable({
  providedIn: 'root'
})
export class SprintbacklogDataService extends DataService<SprintBacklog[]> {

  protected initialize() {
    this.identificacdor = 'sprint-backlog';
    this.load();
    if (this.datos === null) {
      this.setData([]);
    }
  }

}
