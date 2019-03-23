import {Component, OnInit} from '@angular/core';
import {HistoriasUsuarioDataService} from '../servicios/historia-usuario-data.service';
import {HistoriaUsuario} from '../modelos/historia-usuario';
import {Router} from '@angular/router';

@Component({
  selector: 'app-historias-usuario',
  templateUrl: './historias-usuario.component.html',
  styleUrls: ['./historias-usuario.component.scss']
})
export class HistoriasUsuarioComponent implements OnInit {
  private histories: HistoriaUsuario[];

  constructor(private router: Router,
              private historiasUsuarioDataService: HistoriasUsuarioDataService) {
  }

  ngOnInit() {
    this.histories = this.historiasUsuarioDataService.datos;
  }

  navegarEsquema() {
    this.router.navigateByUrl('/esquema');
  }
}
