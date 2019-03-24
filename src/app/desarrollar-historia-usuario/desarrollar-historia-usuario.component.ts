import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SprintbacklogDataService} from '../servicios/sprint-backlog-data.service';
import {Rol, TipoRol} from '../modelos/rol';
import {Miembro} from '../modelos/miembro';
import {Proyecto} from '../modelos/proyecto';
import {Sprint} from '../modelos/sprint';
import {EstadoHistoriaUsuario, HistoriaUsuario} from '../modelos/historia-usuario';
import {MatDialog} from '@angular/material';
import {RolDataService} from '../servicios/rol-data.service';
import {SprintBacklog} from '../modelos/sprint-backlog';
import {SeleccionarMiembroComponent} from '../modal/seleccionar-miembro/seleccionar-miembro.component';
import {SeleccionarRolComponent} from '../modal/seleccionar-rol/seleccionar-rol.component';
import {IngresarValorHojaComponent} from '../modal/ingresar-valor-hoja/ingresar-valor-hoja.component';
import {TipoDatoHoja} from '../modelos/tipo-dato-hoja';
import {SeleccionarProyectoComponent} from '../modal/seleccionar-proyecto/seleccionar-proyecto.component';
import {SeleccionarSprintComponent} from '../modal/seleccionar-sprint/seleccionar-sprint.component';
import {SeleccionarHistoriaUsuarioComponent} from '../modal/seleccionar-historia-usuario/seleccionar-historia-usuario.component';
import {HistoriasUsuarioDataService} from '../servicios/historia-usuario-data.service';

@Component({
  selector: 'app-desarrollar-historia-usuario',
  templateUrl: './desarrollar-historia-usuario.component.html',
  styleUrls: ['./desarrollar-historia-usuario.component.scss']
})
export class DesarrollarHistoriaUsuarioComponent implements OnInit {
  public rol: Rol;
  public miembro: Miembro;
  public proyecto: Proyecto;
  public sprint: Sprint;
  public historiaUsuario: HistoriaUsuario;
  public tamano: number;

  constructor(private router: Router,
              private dialog: MatDialog,
              private rolDataService: RolDataService,
              private sprintbacklogDataService: SprintbacklogDataService,
              private historiasUsuarioDataService: HistoriasUsuarioDataService) {
  }

  ngOnInit() {
  }

  navegarEsquema() {
    this.router.navigateByUrl('/esquema');
  }

  guardar() {
    const x: SprintBacklog = {
      idProyecto: this.proyecto.id,
      idHistoriaUsuario: this.historiaUsuario.id,
      idSprint: this.sprint.id,
      tamano: this.tamano
    };
    const nuevo = this.obtenerBacklogActualizado(x);
    this.sprintbacklogDataService.setData(nuevo);
    this.guardarEstadoHU();
    this.borrarDatos();
  }

  guardarEstadoHU() {
    const historial = this.sprintbacklogDataService.datos.filter(value => value.idHistoriaUsuario === this.historiaUsuario.id);
    const x: HistoriaUsuario = {
      ...this.historiaUsuario,
      estado: this.historiaUsuario.tamano > historial.reduce((a, b) => a + b.tamano, 0)
        ? EstadoHistoriaUsuario.enProgreso
        : EstadoHistoriaUsuario.finalizada
    };
    const nuevo = this.obtenerHistoriasActualizadas(x);
    this.historiasUsuarioDataService.setData(nuevo);
    this.borrarDatos();
  }

  public obtenerHistoriasActualizadas(x: HistoriaUsuario): HistoriaUsuario[] {
    const nuevo = this.historiasUsuarioDataService.datos.map(value => {
      if (value.id === x.id) {
        value.estado = x.estado;
      }
      return value;
    });
    return nuevo;
  }

  public obtenerBacklogActualizado(x: SprintBacklog): SprintBacklog[] {
    let nuevo;
    const existe = !!this.sprintbacklogDataService.datos
      .find(value => value.idSprint === x.idSprint && value.idHistoriaUsuario === x.idHistoriaUsuario);
    if (existe) {
      nuevo = this.sprintbacklogDataService.datos.map(value => {
        if (value.idSprint === x.idSprint && value.idHistoriaUsuario === x.idHistoriaUsuario) {
          value.tamano = this.tamano;
        }
        return value;
      });
    } else {
      nuevo = this.sprintbacklogDataService.datos.concat(x);
    }
    return nuevo;
  }

  public borrarDatos() {
    this.historiaUsuario = null;
    this.sprint = null;
    this.tamano = null;
    this.miembro = null;
    this.rol = null;
  }

  public cargarMiembro(value) {
    if (value) {
      this.miembro = value;
      this.rol = this.rolDataService.datos.find(value1 => value1.id === this.miembro.rol);
    }
  }

  public cargarRol(value) {
    if (value) {
      this.rol = value;
    }
  }

  abrirTamano() {
    if (!this.sprint || !this.historiaUsuario) {
      alert('Primero debe seleccionar un sprint y/o historia de usuario');
      return;
    }
    this.dialog.closeAll();
    const matDialogRef = this.dialog.open(IngresarValorHojaComponent, {
      width: '500px',
      data: {
        tipoDatoHoja: TipoDatoHoja.numero,
        nombre: 'Tamaño de la historia de usuario desarrollada'
      }
    });
    matDialogRef.afterClosed().subscribe(value => {
      if (value !== null && value !== undefined) {
        this.tamano = value;
      }
    });
  }

  abrirProyecto() {
    this.dialog.closeAll();
    const matDialogRef = this.dialog.open(SeleccionarProyectoComponent, {
      width: '500px',
    });
    matDialogRef.afterClosed().subscribe(value => {
      if (this.proyecto && this.proyecto.id !== value.id) {
        this.sprint = null;
        this.historiaUsuario = null;
      }
      this.proyecto = value;
    });
  }

  abrirSprint() {
    if (!this.proyecto) {
      alert('Primero debe seleccionar un proyecto');
      return;
    }
    this.dialog.closeAll();
    const matDialogRef = this.dialog.open(SeleccionarSprintComponent, {
      width: '500px',
      data: {
        proyecto: this.proyecto
      }
    });
    matDialogRef.afterClosed().subscribe(value => {
      this.sprint = value;
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
      this.cargarMiembro(this.historiaUsuario.responsable);
    });
  }

  datosRequeridosCompletos(): boolean {
    return !!this.proyecto && !!this.miembro && !!this.sprint && !!this.historiaUsuario && this.tamano !== null && this.tamano !== undefined;
  }

}
