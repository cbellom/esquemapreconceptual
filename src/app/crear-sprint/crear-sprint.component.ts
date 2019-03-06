import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SprintsDataService} from '../servicios/sprint-data.service';
import {Sprint} from '../modelos/sprint';
import {Proyecto} from '../modelos/proyecto';
import {Rol, TipoRol} from '../modelos/rol';
import {Miembro} from '../modelos/miembro';
import {RolDataService} from '../servicios/rol-data.service';
import {SeleccionarMiembroComponent} from '../modal/seleccionar-miembro/seleccionar-miembro.component';
import {SeleccionarRolComponent} from '../modal/seleccionar-rol/seleccionar-rol.component';
import {MatDialog} from '@angular/material';
import {IngresarValorHojaComponent} from '../modal/ingresar-valor-hoja/ingresar-valor-hoja.component';
import {TipoDatoHoja} from '../modelos/tipo-dato-hoja';
import {SeleccionarProyectoComponent} from '../modal/seleccionar-proyecto/seleccionar-proyecto.component';

@Component({
  selector: 'app-crear-sprint',
  templateUrl: './crear-sprint.component.html',
  styleUrls: ['./crear-sprint.component.scss']
})
export class CrearSprintComponent implements OnInit {
  private rol: Rol;
  private miembro: Miembro;
  private sprints: Sprint[];
  private proyecto: Proyecto;
  private idSprint: number;
  private fechaInicio: Date;
  private fechaFin: Date;
  private velocidadEstimada: string;
  private velocidadReal: string;

  constructor(private router: Router,
              private dialog: MatDialog,
              private rolDataService: RolDataService,
              private sprintsDataService: SprintsDataService) {
  }

  ngOnInit() {
    this.sprints = this.sprintsDataService.datos;
    this.idSprint = this.sprints.length + 1;
    this.cargarVelocidadReal();
    this.cargarVelocidadEstimada();
    this.sprintsDataService.datos$.subscribe(value => {
      this.idSprint = value.length + 1;
      return this.sprints = value;
    });
  }

  navegarEsquema() {
    this.router.navigateByUrl('/esquema');
  }

  guardar() {
    const sprint: Sprint = {
      id: this.idSprint,
      idProyecto: this.proyecto.id,
      velocidadEstimada: +this.velocidadEstimada,
      velocidadReal: +this.velocidadReal,
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      creador: this.miembro.id
    };
    const sprints = this.sprintsDataService.datos.concat(sprint);
    this.sprintsDataService.setData(sprints);
    this.borrarDatos();
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

  cargarVelocidadEstimada() {
    if (this.sprints.length >= 1) {
      this.velocidadEstimada = this.sprints[this.sprints.length - 1].velocidadReal + '';
    } else {
      this.velocidadEstimada = 'NULL';
    }
  }

  cargarVelocidadReal() {
    this.velocidadReal = 'NULL';
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

  abrirFechaInicio() {
    this.dialog.closeAll();
    const matDialogRef = this.dialog.open(IngresarValorHojaComponent, {
      width: '500px',
      data: {
        tipoDatoHoja: TipoDatoHoja.fecha,
        nombre: 'Fecha de inicio del sprint'
      }
    });
    matDialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.fechaInicio = value;
      }
    });
  }

  abrirFechaFin() {
    this.dialog.closeAll();
    const matDialogRef = this.dialog.open(IngresarValorHojaComponent, {
      width: '500px',
      data: {
        tipoDatoHoja: TipoDatoHoja.fecha,
        nombre: 'Fecha de finalización del sprint'
      }
    });
    matDialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.fechaFin = value;
      }
    });
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
    return !!this.proyecto && !!this.miembro && !!this.fechaFin && !!this.fechaFin;
  }


  borrarDatos() {
    this.fechaInicio = null;
    this.fechaFin = null;
    this.miembro = null;
    this.rol = null;
    this.proyecto = null;
  }
}
