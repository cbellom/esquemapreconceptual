import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EstadoHistoriaUsuario, HistoriaUsuario} from '../modelos/historia-usuario';
import {HistoriasUsuarioDataService} from '../servicios/historia-usuario-data.service';
import {SeleccionarRolComponent} from '../modal/seleccionar-rol/seleccionar-rol.component';
import {MatDialog} from '@angular/material';
import {SeleccionarMiembroComponent} from '../modal/seleccionar-miembro/seleccionar-miembro.component';

@Component({
  selector: 'app-crear-historia-usuario',
  templateUrl: './crear-historia-usuario.component.html',
  styleUrls: ['./crear-historia-usuario.component.scss']
})
export class CrearHistoriaUsuarioComponent implements OnInit {
  guardarActivo: boolean;
  private historias: HistoriaUsuario[];

  constructor(private router: Router,
              private dialog: MatDialog,
              private historiasUsuarioDataService: HistoriasUsuarioDataService) {
  }

  ngOnInit() {
    this.guardarActivo = true;
    this.historias = this.historiasUsuarioDataService.datos;
    this.historiasUsuarioDataService.datos$.subscribe(value => this.historias = value);
  }

  abrirRol() {
    this.dialog.closeAll();
    this.dialog.open(SeleccionarRolComponent, {
      width: '500px',
    });
  }

  abrirMiembro() {
    this.dialog.closeAll();
    const matDialogRef = this.dialog.open(SeleccionarMiembroComponent, {
      width: '500px',
    });
    matDialogRef.afterClosed().subscribe(value => console.log(value));
  }

  navegarEsquema() {
    this.router.navigateByUrl('/esquema');
  }

  guardar() {
    const historia: HistoriaUsuario = {
      id: 1,
      idProyecto: 1,
      descripcion: '',
      estado: EstadoHistoriaUsuario.pendiente,
      responsable: null,
      tamano: 1
    };
    const historias = this.historiasUsuarioDataService.datos.concat(historia);
    this.historiasUsuarioDataService.setData(historias);
  }

}
