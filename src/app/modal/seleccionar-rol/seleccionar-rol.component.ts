import {Component, Inject, OnInit} from '@angular/core';
import {RolDataService} from '../../servicios/rol-data.service';
import {Rol, TipoRol} from '../../modelos/rol';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-seleccionar-rol',
  templateUrl: './seleccionar-rol.component.html',
  styleUrls: ['./seleccionar-rol.component.scss']
})
export class SeleccionarRolComponent implements OnInit {
  rolSeleccionado: Rol;
  public roles: Rol[];
  public restriccionRoles: TipoRol[];

  constructor(private rolDataService: RolDataService,
              private dialogRef: MatDialogRef<SeleccionarRolComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { restriccionRoles: TipoRol[] }) {
  }

  ngOnInit() {
    this.roles = this.rolDataService.datos;
    this.restriccionRoles = this.data.restriccionRoles;
  }

  habilitado(rol: Rol) {
    return !!this.restriccionRoles.find(value => value === rol.nombre);
  }

  cerrar() {
    this.dialogRef.close(this.rolSeleccionado);
  }
}
