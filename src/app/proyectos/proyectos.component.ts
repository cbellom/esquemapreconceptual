import { Component, OnInit } from '@angular/core';
import {ProyectoDataService} from '../servicios/proyecto-data.service';
import {Proyecto} from '../modelos/proyecto';
import {MiembrosDataService} from '../servicios/miembros-data.service';
import {Miembro} from '../modelos/miembro';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent implements OnInit {

  constructor(public proyectoDataService: ProyectoDataService, public miembrosDataService: MiembrosDataService) { }

  projects: Proyecto[] = this.proyectoDataService.datos;
  creators: string[] = this.projects.map(value => {
    return this.miembrosDataService.datos.find(value1 => value.creador === value1.id).nombre;
  });

  ngOnInit() {
    console.log(this.creators);
  }
}
