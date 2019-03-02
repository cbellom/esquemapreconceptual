import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-crear-historia-usuario',
  templateUrl: './crear-historia-usuario.component.html',
  styleUrls: ['./crear-historia-usuario.component.scss']
})
export class CrearHistoriaUsuarioComponent implements OnInit {
  guardarActivo: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navegarEsquema() {
    this.router.navigateByUrl('/esquema');
  }

  guardar() {

  }

}
