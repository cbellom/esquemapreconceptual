import {Component, OnInit} from '@angular/core';
import {ProyectoDataService} from '../servicios/proyecto-data.service';
import {Observable} from 'rxjs';
import {Proyecto} from '../modelos/proyecto';
import {Router} from '@angular/router';
import {MiembrosDataService} from '../servicios/miembros-data.service';
import {RolDataService} from '../servicios/rol-data.service';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.scss']
})
export class CrearProyectoComponent implements OnInit {
  private proyectos: Proyecto[];
  guardarActivo: boolean;

  constructor(private proyectoDataService: ProyectoDataService,
              private miembrosDataService: MiembrosDataService,
              private rolDataService: RolDataService,
              private router: Router) {
  }

  ngOnInit() {
    this.guardarActivo = true;
    this.proyectos = this.proyectoDataService.datos;
    this.proyectoDataService.datos$.subscribe(value => this.proyectos = value);
  }

  navegarEsquema() {
    this.router.navigateByUrl('/esquema');
  }

  guardar() {
    const proyecto: Proyecto = {
      id: 1,
      nombre: 'Test',
      trabajo: {
        estado: null,
        horizonteMaximo: null,
        horizonteMinimo: null
      }
    };
    const proyectos = this.proyectoDataService.datos.concat(proyecto);
    this.proyectoDataService.setData(proyectos);
  }

}
