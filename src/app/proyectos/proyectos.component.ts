import {Component, OnInit} from '@angular/core';
import {ProyectoDataService} from '../servicios/proyecto-data.service';
import {Proyecto} from '../modelos/proyecto';
import {MiembrosDataService} from '../servicios/miembros-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent implements OnInit {
  private projects: Proyecto[] = [];
  private creators: string[] = [];

  constructor(private router: Router,
              public proyectoDataService: ProyectoDataService,
              public miembrosDataService: MiembrosDataService) {
  }

  ngOnInit() {
    this.projects = this.proyectoDataService.datos;
    this.creators = this.projects.map(value => {
      return this.miembrosDataService.datos.find(value1 => value.creador === value1.id).nombre;
    });
  }

  navegarEsquema() {
    this.router.navigateByUrl('/esquema');
  }
}
