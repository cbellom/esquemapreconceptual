import {Component, OnInit} from '@angular/core';
import {SprintsDataService} from '../servicios/sprint-data.service';
import {MiembrosDataService} from '../servicios/miembros-data.service';
import {Sprint} from '../modelos/sprint';
import {Router} from '@angular/router';
import {ProyectoDataService} from '../servicios/proyecto-data.service';
import {Proyecto} from '../modelos/proyecto';

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.scss']
})
export class SprintsComponent implements OnInit {
  private proyecto: Proyecto[] = [];
  private sprints: Sprint[] = [];
  private creators: string[] = [];

  constructor(private router: Router,
              private sprintDataService: SprintsDataService,
              private miembrosDataService: MiembrosDataService,
              private proyectoDataService: ProyectoDataService) {
  }

  ngOnInit() {
    this.proyecto = this.proyectoDataService.datos;
    this.proyectoDataService.datos$.subscribe(value => this.proyecto = value);
    this.sprints = this.sprintDataService.datos;
    this.creators = this.sprints.map(value => {
      return this.miembrosDataService.datos.find(value1 => value1.id === value.creador).nombre;
    });
  }

  navegarEsquema() {
    this.router.navigateByUrl('/esquema');
  }

  obtenerNombreProyecto(id) {
    return this.proyecto.find(value => value.id === id).nombre;
  }

}
