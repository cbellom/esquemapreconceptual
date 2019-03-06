import {Component, Inject, OnInit} from '@angular/core';
import {Proyecto} from '../../modelos/proyecto';
import {ProyectoDataService} from '../../servicios/proyecto-data.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HistoriasUsuarioDataService} from '../../servicios/historia-usuario-data.service';
import {HistoriaUsuario} from '../../modelos/historia-usuario';

@Component({
  selector: 'app-seleccionar-historia-usuario',
  templateUrl: './seleccionar-historia-usuario.component.html',
  styleUrls: ['./seleccionar-historia-usuario.component.scss']
})
export class SeleccionarHistoriaUsuarioComponent implements OnInit {
  historiaUsuario: HistoriaUsuario;
  private historiaUsuarios: HistoriaUsuario[];

  constructor(private historiasUsuarioDataService: HistoriasUsuarioDataService,
              private dialogRef: MatDialogRef<SeleccionarHistoriaUsuarioComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
    this.historiaUsuarios = this.historiasUsuarioDataService.datos;
  }

  cerrar() {
    this.dialogRef.close(this.historiaUsuario);
  }

}
