import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EstadoHistoriaUsuario, HistoriaUsuario} from '../modelos/historia-usuario';
import {HistoriasUsuarioDataService} from '../servicios/historia-usuario-data.service';
import {RolDataService} from '../servicios/rol-data.service';
import {SeleccionarRolComponent} from '../modal/seleccionar-rol/seleccionar-rol.component';
import {MatDialog} from '@angular/material';
import {SeleccionarMiembroComponent} from '../modal/seleccionar-miembro/seleccionar-miembro.component';
import {SeleccionarProyectoComponent} from '../modal/seleccionar-proyecto/seleccionar-proyecto.component';
import {Proyecto} from '../modelos/proyecto';
import {Miembro} from '../modelos/miembro';
import {Rol, TipoRol} from '../modelos/rol';
import {IngresarValorHojaComponent} from '../modal/ingresar-valor-hoja/ingresar-valor-hoja.component';
import {TipoDatoHoja} from '../modelos/tipo-dato-hoja';

@Component({
  selector: 'app-crear-historia-usuario',
  templateUrl: './crear-historia-usuario.component.html',
  styleUrls: ['./crear-historia-usuario.component.scss']
})
export class CrearHistoriaUsuarioComponent implements OnInit {
  guardarActivo: boolean;
  public historias: HistoriaUsuario[];
  public proyecto: Proyecto;
  public rol: Rol;
  public miembro: Miembro;
  public idHistoria: number;
  public descripcionHistoria: string;
  public responsableHistoria: number;
  public estadoHistoria: string;
  public tamanoHistoria: number;

  constructor(private router: Router,
              private dialog: MatDialog,
              private historiasUsuarioDataService: HistoriasUsuarioDataService,
              private rolDataService: RolDataService) {
  }

  ngOnInit() {
    this.guardarActivo = true;
    this.historias = this.historiasUsuarioDataService.datos;
    this.idHistoria = this.historias.length + 1;
    this.estadoHistoria = EstadoHistoriaUsuario.pendiente;
    this.responsableHistoria = null;
      this.historiasUsuarioDataService.datos$.subscribe(value => {
      this.idHistoria = value.length + 1;
      this.historias = value;
    });
  }

  abrirMiembro() {
    this.dialog.closeAll();
    const matDialogRef = this.dialog.open(SeleccionarMiembroComponent, {
      width: '500px',
      data: {restriccionRoles: [TipoRol.scrumMaster]}
    });
    matDialogRef.afterClosed().subscribe(value => {
      this.cargarMiembro(value);
    });
  }

  abrirRol() {
    this.dialog.closeAll();
    const matDialogRef = this.dialog.open(SeleccionarRolComponent, {
      width: '500px',
      data: {restriccionRoles: [TipoRol.scrumMaster]}
    });
    matDialogRef.afterClosed().subscribe(value => {
      this.cargarRol(value);
    });
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

  navegarEsquema() {
    this.router.navigateByUrl('/esquema');
  }

  abrirProyecto() {
    this.dialog.closeAll();
    const matDialogRef = this.dialog.open(SeleccionarProyectoComponent, {
      width: '500px',
    });
    matDialogRef.afterClosed().subscribe(value => {
      this.proyecto = value;
    });
  }

  datosRequeridosCompletos(): boolean {
    return !!this.miembro && !!this.rol && !!this.proyecto && !!this.descripcionHistoria && !!this.tamanoHistoria;
  }

  abrirDescripcion() {
    this.dialog.closeAll();
    const matDialogRef = this.dialog.open(IngresarValorHojaComponent, {
      width: '500px',
      data: {
        tipoDatoHoja: TipoDatoHoja.texto,
        nombre: 'Descripción de la historia de usuario'
      }
    });
    matDialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.descripcionHistoria = value;
      }
    });
  }

  abrirTamano() {
    this.dialog.closeAll();
    const matDialogRef = this.dialog.open(IngresarValorHojaComponent, {
      width: '500px',
      data: {
        tipoDatoHoja: TipoDatoHoja.texto,
        nombre: 'Tamaño de la historia de usuario'
      }
    });
    matDialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.tamanoHistoria = value;
      }
    });
  }

  guardar() {
    const historia: HistoriaUsuario = {
      id: this.idHistoria,
      idProyecto: this.proyecto.id,
      descripcion: this.descripcionHistoria,
      estado: EstadoHistoriaUsuario.pendiente,
      responsable: null,
      tamano: this.tamanoHistoria,
      creador: this.miembro.id
    };
    const historias = this.historiasUsuarioDataService.datos.concat(historia);
    this.historiasUsuarioDataService.setData(historias);
    this.borrarDatos();
  }

  borrarDatos() {
    this.proyecto = null;
    this.tamanoHistoria = null;
    this.descripcionHistoria = null;
    this.miembro = null;
    this.rol = null;
  }
}
