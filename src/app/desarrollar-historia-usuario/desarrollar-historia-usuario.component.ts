import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-desarrollar-historia-usuario',
  templateUrl: './desarrollar-historia-usuario.component.html',
  styleUrls: ['./desarrollar-historia-usuario.component.scss']
})
export class DesarrollarHistoriaUsuarioComponent implements OnInit {
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
