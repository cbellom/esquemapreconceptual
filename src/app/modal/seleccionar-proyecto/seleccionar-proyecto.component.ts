import {Component, Inject, OnInit} from '@angular/core';
import {Miembro} from '../../modelos/miembro';
import {Rol, TipoRol} from '../../modelos/rol';
import {MiembrosDataService} from '../../servicios/miembros-data.service';
import {RolDataService} from '../../servicios/rol-data.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ProyectoDataService} from '../../servicios/proyecto-data.service';
import {Proyecto} from '../../modelos/proyecto';

@Component({
  selector: 'app-seleccionar-proyecto',
  templateUrl: './seleccionar-proyecto.component.html',
  styleUrls: ['./seleccionar-proyecto.component.scss']
})
export class SeleccionarProyectoComponent implements OnInit {
  proyectoSeleccionado: Proyecto;
  private proyectos: Proyecto[];

  constructor(private miembrosDataService: ProyectoDataService,
              private dialogRef: MatDialogRef<SeleccionarProyectoComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
    this.proyectos = this.miembrosDataService.datos;
  }

  cerrar() {
    this.dialogRef.close(this.proyectoSeleccionado);
  }

}
