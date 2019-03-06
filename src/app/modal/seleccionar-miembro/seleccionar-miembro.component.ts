import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Miembro} from '../../modelos/miembro';
import {MiembrosDataService} from '../../servicios/miembros-data.service';
import {Rol, TipoRol} from '../../modelos/rol';
import {RolDataService} from '../../servicios/rol-data.service';

@Component({
  selector: 'app-seleccionar-miembro',
  templateUrl: './seleccionar-miembro.component.html',
  styleUrls: ['./seleccionar-miembro.component.scss']
})
export class SeleccionarMiembroComponent implements OnInit {
  miembroSeleccionado: Miembro;
  private miembros: Miembro[];
  private restriccionRoles: TipoRol[];
  private roles: Rol[];

  constructor(private miembrosDataService: MiembrosDataService,
              private rolDataService: RolDataService,
              private dialogRef: MatDialogRef<SeleccionarMiembroComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { restriccionRoles: TipoRol[] }) {
  }

  ngOnInit() {
    this.roles = this.rolDataService.datos;
    this.miembros = this.miembrosDataService.datos;
    this.restriccionRoles = this.data.restriccionRoles;
  }

  habilitado(miembro: Miembro) {
    const rol = this.roles.find(value => value.id === miembro.rol);
    return rol && !!this.restriccionRoles.find(value => value === rol.nombre);
  }

  cerrar() {
    this.dialogRef.close(this.miembroSeleccionado);
  }

}
