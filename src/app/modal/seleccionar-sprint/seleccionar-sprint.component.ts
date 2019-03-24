import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SprintsDataService} from '../../servicios/sprint-data.service';
import {Sprint} from '../../modelos/sprint';
import {Proyecto} from '../../modelos/proyecto';

@Component({
  selector: 'app-seleccionar-sprint',
  templateUrl: './seleccionar-sprint.component.html',
  styleUrls: ['./seleccionar-sprint.component.scss']
})
export class SeleccionarSprintComponent implements OnInit {
  sprintSeleccionado: Sprint;
  public sprints: Sprint[];

  constructor(private sprintsDataService: SprintsDataService,
              private dialogRef: MatDialogRef<SeleccionarSprintComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { proyecto: Proyecto }) {
  }

  ngOnInit() {
    this.sprints = this.sprintsDataService.datos.filter(value => value.idProyecto === this.data.proyecto.id);
  }

  cerrar() {
    this.dialogRef.close(this.sprintSeleccionado);
  }

}
