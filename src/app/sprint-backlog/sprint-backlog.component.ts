import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SprintbacklogDataService} from '../servicios/sprint-backlog-data.service';
import {SprintBacklog} from '../modelos/sprint-backlog';
import {ProyectoDataService} from '../servicios/proyecto-data.service';
import {Proyecto} from '../modelos/proyecto';

@Component({
  selector: 'app-sprint-backlog',
  templateUrl: './sprint-backlog.component.html',
  styleUrls: ['./sprint-backlog.component.scss']
})
export class SprintBacklogComponent implements OnInit {
  private datos: SprintBacklog[] = [];
  private proyecto: Proyecto[] = [];

  constructor(private router: Router,
              private proyectoDataService: ProyectoDataService,
              private sprintbacklogDataService: SprintbacklogDataService) {
  }

  ngOnInit() {
    this.proyecto = this.proyectoDataService.datos;
    this.datos = this.sprintbacklogDataService.datos.sort((a, b) => a.idProyecto - b.idProyecto);
  }

  navegarEsquema() {
    this.router.navigateByUrl('/esquema');
  }

  obtenerNombreProyecto(id) {
    return this.proyecto.find(value => value.id === id).nombre;
  }

}
