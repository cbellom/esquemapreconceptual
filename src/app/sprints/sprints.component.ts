import { Component, OnInit } from '@angular/core';
import {SprintsDataService} from '../servicios/sprint-data.service';
import {MiembrosDataService} from '../servicios/miembros-data.service';
import {Sprint} from '../modelos/sprint';

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.scss']
})
export class SprintsComponent implements OnInit {

  constructor(private sprintDataService: SprintsDataService, private miembrosDataService: MiembrosDataService) { }

  sprints: Sprint[] = this.sprintDataService.datos;
  creators: string[] = this.sprints.map(value => {
    return this.miembrosDataService.datos.find(value1 => value1.id === value.creador).nombre;
  });

  ngOnInit() {
  }

}
