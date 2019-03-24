import {Component, OnInit} from '@angular/core';
import {TrabajoDataService} from '../servicios/trabajo-data.service';
import {Trabajo} from '../modelos/trabajo';
import {Router} from '@angular/router';
import {ProyectoDataService} from '../servicios/proyecto-data.service';
import {Proyecto} from '../modelos/proyecto';

@Component({
  selector: 'app-trabajo',
  templateUrl: './trabajo.component.html',
  styleUrls: ['./trabajo.component.scss']
})
export class TrabajoComponent implements OnInit {
  public trabajos: Trabajo[] = [];
  public proyecto: Proyecto[] = [];

  constructor(private router: Router,
              private trabajoDataService: TrabajoDataService,
              private proyectoDataService: ProyectoDataService) {
  }

  ngOnInit() {
    this.proyecto = this.proyectoDataService.datos;
    this.trabajos = this.trabajoDataService.datos;
    this.proyectoDataService.datos$.subscribe(value => this.proyecto = value);
    this.trabajoDataService.datos$.subscribe(value => {
      return this.trabajos = value;
    });
  }

  obtenerNombreProyecto(id) {
    return this.proyecto.find(value => value.id === id).nombre;
  }

  navegarEsquema() {
    this.router.navigateByUrl('/esquema');
  }
}
