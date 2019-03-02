import {Component, OnInit} from '@angular/core';
import {ProyectoDataService} from '../servicios/proyecto-data.service';
import {Observable} from 'rxjs';
import {Proyecto} from '../modelos/proyecto';
import {Router} from '@angular/router';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.scss']
})
export class CrearProyectoComponent implements OnInit {
  private proyectos$: Observable<Proyecto[]>;
  guardarActivo: boolean;

  constructor(private proyectoDataService: ProyectoDataService,
              private router: Router) {
  }

  ngOnInit() {
    this.guardarActivo = true;
    this.proyectos$ = this.proyectoDataService.datos$.asObservable();
  }

  navegarEsquema() {
    this.router.navigateByUrl('/esquema');
  }

  guardar() {
    const proyecto: Proyecto = {
      id: 1,
      nombre: 'Test',
      trabajo: null
    };
    console.log(this.proyectoDataService.datos);
    const proyectos = this.proyectoDataService.datos.push(proyecto);
    this.proyectoDataService.setData(proyectos);
  }

}
