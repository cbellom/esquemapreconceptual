import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SprintsDataService} from '../servicios/sprint-data.service';
import {Sprint} from '../modelos/sprint';

@Component({
  selector: 'app-crear-sprint',
  templateUrl: './crear-sprint.component.html',
  styleUrls: ['./crear-sprint.component.scss']
})
export class CrearSprintComponent implements OnInit {
  guardarActivo: boolean;
  private sprints: Sprint[];

  constructor(private router: Router,
              private sprintsDataService: SprintsDataService) {
  }

  ngOnInit() {
    this.guardarActivo = true;
    this.sprints = this.sprintsDataService.datos;
    this.sprintsDataService.datos$.subscribe(value => this.sprints = value);
  }

  navegarEsquema() {
    this.router.navigateByUrl('/esquema');
  }

  guardar() {
    const sprint: Sprint = {
      id: 1,
      idProyecto: 1,
      velocidadEstimada: 10,
      velocidadReal: null,
      fechaInicio: new Date(),
      fechaFin: new Date()
    };
    const sprints = this.sprintsDataService.datos.concat(sprint);
    this.sprintsDataService.setData(sprints);
  }
}
