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
import {InstruccionesComponent} from '../modal/instrucciones/instrucciones.component';
import {StepsDataService} from '../servicios/steps.service';

@Component({
  selector: 'app-crear-sprint',
  templateUrl: './crear-sprint.component.html',
  styleUrls: ['./crear-sprint.component.scss']
})
export class CrearSprintComponent implements OnInit {
  public rol: Rol;
  public miembro: Miembro;
  public sprints: Sprint[];
  public proyecto: Proyecto;
  public idSprint: number;
  public fechaInicio: Date;
  public fechaFin: Date;
  public velocidadEstimada: string;
  public velocidadReal: string;
  step: String[];

  constructor(private router: Router,
              private dialog: MatDialog,
              private rolDataService: RolDataService,
              private stepsDataService: StepsDataService,
              private sprintsDataService: SprintsDataService) {
  }

  ngOnInit() {
    this.sprints = this.sprintsDataService.datos;
    this.cargarVelocidadReal();
    this.sprintsDataService.datos$.subscribe(value => {
      return this.sprints = value;
    });
    this.step = this.stepsDataService.getSteps().find(value => value.name === 'crear-sprint').items;
    //Promise.resolve().then(() => this.abrirInstrucciones());
  }

  abrirInstrucciones() {
    this.dialog.closeAll();
    const matDialogRef = this.dialog.open(InstruccionesComponent, {
      width: '500px',
      data: {specificSteps: this.step}
    });

    matDialogRef.afterClosed().subscribe(value => {
      console.log('Cerrando instrucciones');
    });
  }

  navegarEsquema() {
    this.router.navigateByUrl('/esquema');
  }

  guardar() {
    const sprint: Sprint = {
      id: this.idSprint,
      idProyecto: this.proyecto.id,
      velocidadEstimada: !isNaN(+this.velocidadEstimada) ? +this.velocidadEstimada : null,
      velocidadReal: !isNaN(+this.velocidadReal) ? +this.velocidadReal : null,
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

  cargarVelocidadEstimada(sprints: Sprint[]) {
    if (sprints.length >= 1) {
      this.velocidadEstimada = sprints[this.sprints.length - 1].velocidadReal + '';
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

  abrirFechaInicio() {
    if (!this.proyecto) {
      alert('Primero debe seleccionar un proyecto');
      return;
    }
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
    if (!this.proyecto) {
      alert('Primero debe seleccionar un proyecto');
      return;
    }
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
      const sprints = this.sprints.filter(s => s.idProyecto === this.proyecto.id);
      this.idSprint = this.sprints.filter(s => s.idProyecto === this.proyecto.id).length + 1;
      this.cargarVelocidadEstimada(sprints);
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
    this.velocidadEstimada = null;
  }
}
