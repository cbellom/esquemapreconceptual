import { Component, OnInit } from '@angular/core';
import {ProyectoDataService} from '../servicios/proyecto-data.service';
import {Proyecto} from '../modelos/proyecto';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent implements OnInit {

  constructor(public proyectoDataService: ProyectoDataService) { }

  projects: Proyecto[] = this.proyectoDataService.datos;

  ngOnInit() {
  }

}
