import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {Proyecto} from '../modelos/proyecto';
import {Sprint} from '../modelos/sprint';
import {HistoriaUsuario} from '../modelos/historia-usuario';

@Injectable({
  providedIn: 'root'
})
export class HistoriasUsuarioDataService extends DataService<HistoriaUsuario[]> {

  protected initialize() {
    this.identificacdor = 'historiasUsuario';
    this.load();
    if (this.datos === null) {
      this.setData([]);
    }
  }

}
