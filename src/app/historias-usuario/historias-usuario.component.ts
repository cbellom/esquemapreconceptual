import { Component, OnInit } from '@angular/core';
import {MiembrosDataService} from '../servicios/miembros-data.service';
import {HistoriasUsuarioDataService} from '../servicios/historia-usuario-data.service';
import {HistoriaUsuario} from '../modelos/historia-usuario';

@Component({
  selector: 'app-historias-usuario',
  templateUrl: './historias-usuario.component.html',
  styleUrls: ['./historias-usuario.component.scss']
})
export class HistoriasUsuarioComponent implements OnInit {

  constructor(private historiasUsuarioDataService: HistoriasUsuarioDataService, private miembrosDataService: MiembrosDataService) { }

  histories: HistoriaUsuario[] = this.historiasUsuarioDataService.datos;
  creators: string[] = this.histories.map(value => {
    return this.miembrosDataService.datos.find(value1 => value.creador === value1.id).nombre;
  });

  ngOnInit() {
    console.log(this.creators);
  }

}
