import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SprintsDataService} from '../../servicios/sprint-data.service';
import {Sprint} from '../../modelos/sprint';

@Component({
  selector: 'app-seleccionar-sprint',
  templateUrl: './seleccionar-sprint.component.html',
  styleUrls: ['./seleccionar-sprint.component.scss']
})
export class SeleccionarSprintComponent implements OnInit {
  sprintSeleccionado: Sprint;
  private sprints: Sprint[];

  constructor(private sprintsDataService: SprintsDataService,
              private dialogRef: MatDialogRef<SeleccionarSprintComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
    this.sprints = this.sprintsDataService.datos;
  }

  cerrar() {
    this.dialogRef.close(this.sprintSeleccionado);
  }

}
