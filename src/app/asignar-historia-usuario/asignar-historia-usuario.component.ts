import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-asignar-historia-usuario',
  templateUrl: './asignar-historia-usuario.component.html',
  styleUrls: ['./asignar-historia-usuario.component.scss']
})
export class AsignarHistoriaUsuarioComponent implements OnInit {
  guardarActivo: boolean;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  navegarEsquema() {
    this.router.navigateByUrl('/esquema');
  }

  guardar() {

  }
}
