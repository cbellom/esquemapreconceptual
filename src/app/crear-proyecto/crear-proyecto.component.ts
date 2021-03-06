import {Component, OnInit} from '@angular/core';
import {ProyectoDataService} from '../servicios/proyecto-data.service';
import {Proyecto} from '../modelos/proyecto';
import {Router} from '@angular/router';
import {RolDataService} from '../servicios/rol-data.service';
import {MatDialog} from '@angular/material';
import {SeleccionarRolComponent} from '../modal/seleccionar-rol/seleccionar-rol.component';
import {SeleccionarMiembroComponent} from '../modal/seleccionar-miembro/seleccionar-miembro.component';
import {Rol, TipoRol} from '../modelos/rol';
import {Miembro} from '../modelos/miembro';
import {IngresarValorHojaComponent} from '../modal/ingresar-valor-hoja/ingresar-valor-hoja.component';
import {TipoDatoHoja} from '../modelos/tipo-dato-hoja';
import {InstruccionesComponent} from '../modal/instrucciones/instrucciones.component';
import {StepsDataService} from '../servicios/steps.service';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.scss']
})

export class CrearProyectoComponent implements OnInit {
  public proyectos: Proyecto[];
  rol: Rol;
  miembro: Miembro;
  nombreProyecto: string;
  idProyecto: number;
  step: String[];

  constructor(private proyectoDataService: ProyectoDataService,
              private rolDataService: RolDataService,
              private stepsDataService: StepsDataService,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit() {
    this.proyectos = this.proyectoDataService.datos;
    this.idProyecto = this.proyectos.length + 1;
    this.proyectoDataService.datos$.subscribe(value => {
      this.idProyecto = value.length + 1;
      return this.proyectos = value;
    });

    this.step = this.stepsDataService.getSteps().find(value => value.name === 'crear-proyecto').items;
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

  abrirMiembro() {
    this.dialog.closeAll();
    const matDialogRef = this.dialog.open(SeleccionarMiembroComponent, {
      width: '500px',
      data: {restriccionRoles: [TipoRol.gerente]}
    });
    matDialogRef.afterClosed().subscribe(value => {
      this.cargarMiembro(value);
    });
  }

  abrirRol() {
    this.dialog.closeAll();
    const matDialogRef = this.dialog.open(SeleccionarRolComponent, {
      width: '500px',
      data: {restriccionRoles: [TipoRol.gerente]}
    });
    matDialogRef.afterClosed().subscribe(value => {
      this.cargarRol(value);
      return console.log(value);
    });
  }

  abrirNombre() {
    this.dialog.closeAll();
    const matDialogRef = this.dialog.open(IngresarValorHojaComponent, {
      width: '500px',
      data: {
        tipoDatoHoja: TipoDatoHoja.texto,
        nombre: 'Nombre del proyecto'
      }
    });
    matDialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.nombreProyecto = value;
      }
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

  datosRequeridosCompletos(): boolean {
    return !!this.miembro && !!this.rol && !!this.nombreProyecto;
  }

  navegarEsquema() {
    this.router.navigateByUrl('/esquema');
  }

  guardar() {
    const proyecto: Proyecto = {
      id: this.idProyecto,
      nombre: this.nombreProyecto,
      creador: this.miembro.id
    };
    const proyectos = this.proyectoDataService.datos.concat(proyecto);
    this.proyectoDataService.setData(proyectos);
    this.borrarDatos();
  }

  borrarDatos() {
    this.nombreProyecto = null;
    this.miembro = null;
    this.rol = null;
  }

}
