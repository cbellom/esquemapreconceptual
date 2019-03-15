import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Rol, TipoRol} from '../modelos/rol';
import {Miembro} from '../modelos/miembro';
import {Proyecto} from '../modelos/proyecto';
import {EstadoHistoriaUsuario, HistoriaUsuario} from '../modelos/historia-usuario';
import {MatDialog} from '@angular/material';
import {RolDataService} from '../servicios/rol-data.service';
import {SeleccionarMiembroComponent} from '../modal/seleccionar-miembro/seleccionar-miembro.component';
import {SeleccionarRolComponent} from '../modal/seleccionar-rol/seleccionar-rol.component';
import {SeleccionarProyectoComponent} from '../modal/seleccionar-proyecto/seleccionar-proyecto.component';
import {SeleccionarHistoriaUsuarioComponent} from '../modal/seleccionar-historia-usuario/seleccionar-historia-usuario.component';
import {HistoriasUsuarioDataService} from '../servicios/historia-usuario-data.service';

@Component({
  selector: 'app-asignar-historia-usuario',
  templateUrl: './asignar-historia-usuario.component.html',
  styleUrls: ['./asignar-historia-usuario.component.scss']
})
export class AsignarHistoriaUsuarioComponent implements OnInit {
  private rol: Rol;
  private miembro: Miembro;
  private proyecto: Proyecto;
  private historiaUsuario: HistoriaUsuario;

  constructor(private router: Router,
              private dialog: MatDialog,
              private rolDataService: RolDataService,
              private historiasUsuarioDataService: HistoriasUsuarioDataService) {
  }

  ngOnInit() {
  }

  navegarEsquema() {
    this.router.navigateByUrl('/esquema');
  }

  guardar() {
    const x: HistoriaUsuario = {
      ...this.historiaUsuario,
      responsable: this.miembro
    };
    const nuevo = this.obtenerHistoriasActualizadas(x);
    this.historiasUsuarioDataService.setData(nuevo);
    this.borrarDatos();
  }

  private obtenerHistoriasActualizadas(x: HistoriaUsuario): HistoriaUsuario[] {
    const nuevo = this.historiasUsuarioDataService.datos.map(value => {
      if (value.id === x.id) {
        value.responsable = this.miembro;
        value.estado = EstadoHistoriaUsuario.enProgreso;
      }
      return value;
    });
    return nuevo;
  }

  private borrarDatos() {
    this.historiaUsuario = null;
    this.miembro = null;
  }

  abrirMiembro() {
    this.dialog.closeAll();
    const matDialogRef = this.dialog.open(SeleccionarMiembroComponent, {
      width: '500px',
      data: {restriccionRoles: [TipoRol.desarrollador]}
    });
    matDialogRef.afterClosed().subscribe(value => {
      this.cargarMiembro(value);
    });
  }

  abrirRol() {
    this.dialog.closeAll();
    const matDialogRef = this.dialog.open(SeleccionarRolComponent, {
      width: '500px',
      data: {restriccionRoles: [TipoRol.desarrollador]}
    });
    matDialogRef.afterClosed().subscribe(value => {
      this.cargarRol(value);
    });
  }

  private cargarMiembro(value) {
    if (value) {
      this.miembro = value;
      this.rol = this.rolDataService.datos.find(value1 => value1.id === this.miembro.rol);
    }
  }

  private cargarRol(value) {
    if (value) {
      this.rol = value;
    }
  }

  abrirProyecto() {
    this.dialog.closeAll();
    const matDialogRef = this.dialog.open(SeleccionarProyectoComponent, {
      width: '500px',
    });
    matDialogRef.afterClosed().subscribe(value => {
      if (value) {
        if (this.proyecto && this.proyecto.id !== value.id) {
          this.historiaUsuario = null;
        }
        this.proyecto = value;
      }
    });
  }

  abrirHistoriaUsuario() {
    if (!this.proyecto) {
      alert('Primero debe seleccionar un proyecto');
      return;
    }
    this.dialog.closeAll();
    const matDialogRef = this.dialog.open(SeleccionarHistoriaUsuarioComponent, {
      width: '500px',
      data: {
        proyecto: this.proyecto
      }
    });
    matDialogRef.afterClosed().subscribe(value => {
      this.historiaUsuario = value;
    });
  }

  datosRequeridosCompletos(): boolean {
    return !!this.proyecto && !!this.miembro && !!this.historiaUsuario;
  }
}
