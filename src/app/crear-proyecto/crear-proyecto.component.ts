import { Component, OnInit } from '@angular/core';
import {ProyectoDataService} from '../servicios/proyecto-data.service';
import {Observable} from 'rxjs';
import {Proyecto} from '../modelos/proyecto';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.scss']
})
export class CrearProyectoComponent implements OnInit {
  private proyectos$: Observable<Proyecto>;

  constructor(private proyectoDataService: ProyectoDataService) { }

  ngOnInit() {
    this.proyectos$ = this.proyectoDataService.datos$.asObservable();
  }

}
