import {Component, OnInit} from '@angular/core';
import {ProyectoDataService} from '../servicios/proyecto-data.service';
import {Observable} from 'rxjs';
import {Proyecto} from '../modelos/proyecto';
import {Router} from '@angular/router';
import {MiembrosDataService} from '../servicios/miembros-data.service';
import {RolDataService} from '../servicios/rol-data.service';
import {MatDialog} from '@angular/material';
import {SeleccionarRolComponent} from '../modal/seleccionar-rol/seleccionar-rol.component';
import {SeleccionarMiembroComponent} from '../modal/seleccionar-miembro/seleccionar-miembro.component';
import {Rol, TipoRol} from '../modelos/rol';
import {Miembro} from '../modelos/miembro';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.scss']
})
export class CrearProyectoComponent implements OnInit {
  private proyectos: Proyecto[];
  guardarActivo: boolean;
  rol: Rol;
  miembro: Miembro;

  constructor(private proyectoDataService: ProyectoDataService,
              private miembrosDataService: MiembrosDataService,
              private rolDataService: RolDataService,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit() {
    this.guardarActivo = true;
    this.proyectos = this.proyectoDataService.datos;
    this.proyectoDataService.datos$.subscribe(value => this.proyectos = value);
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

  navegarEsquema() {
    this.router.navigateByUrl('/esquema');
  }

  guardar() {
    const proyecto: Proyecto = {
      id: 1,
      nombre: 'Test',
      trabajo: {
        estado: null,
        horizonteMaximo: null,
        horizonteMinimo: null
      }
    };
    const proyectos = this.proyectoDataService.datos.concat(proyecto);
    this.proyectoDataService.setData(proyectos);
  }

}
