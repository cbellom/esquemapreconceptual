import {Component, OnInit} from '@angular/core';
import {Proyecto} from '../modelos/proyecto';
import {Router} from '@angular/router';
import {ProyectoDataService} from '../servicios/proyecto-data.service';
import {EquipoDataService} from '../servicios/equipo-data.service';
import {Equipo} from '../modelos/equipo';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.scss']
})
export class EquipoComponent implements OnInit {
  public proyecto: Proyecto[] = [];
  public equipos: Equipo[] = [];

  constructor(private router: Router,
              private equipoDataService: EquipoDataService,
              private proyectoDataService: ProyectoDataService) {
  }

  ngOnInit() {
    this.proyecto = this.proyectoDataService.datos;
    this.equipos = this.equipoDataService.datos;
    this.proyectoDataService.datos$.subscribe(value => this.proyecto = value);
    this.equipoDataService.datos$.subscribe(value => {
      return this.equipos = value;
    });
  }

  obtenerNombreProyecto(id) {
    return this.proyecto.find(value => value.id === id).nombre;
  }

  navegarEsquema() {
    this.router.navigateByUrl('/esquema');
  }

}
