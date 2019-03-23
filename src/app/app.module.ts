import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EsquemaComponent} from './esquema/esquema.component';
import {CrearSprintComponent} from './crear-sprint/crear-sprint.component';
import {CrearHistoriaUsuarioComponent} from './crear-historia-usuario/crear-historia-usuario.component';
import {AsignarHistoriaUsuarioComponent} from './asignar-historia-usuario/asignar-historia-usuario.component';
import {DesarrollarHistoriaUsuarioComponent} from './desarrollar-historia-usuario/desarrollar-historia-usuario.component';
import {CrearProyectoComponent} from './crear-proyecto/crear-proyecto.component';
import {MaterialModule} from './material/material.module';
import {SeleccionarRolComponent} from './modal/seleccionar-rol/seleccionar-rol.component';
import {SeleccionarMiembroComponent} from './modal/seleccionar-miembro/seleccionar-miembro.component';
import {IngresarValorHojaComponent} from './modal/ingresar-valor-hoja/ingresar-valor-hoja.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SprintsComponent} from './sprints/sprints.component';
import {ProyectosComponent} from './proyectos/proyectos.component';
import {MiembrosComponent} from './miembros/miembros.component';
import {RolesComponent} from './roles/roles.component';
import {HistoriasUsuarioComponent} from './historias-usuario/historias-usuario.component';
import {SeleccionarProyectoComponent} from './modal/seleccionar-proyecto/seleccionar-proyecto.component';
import {SeleccionarSprintComponent} from './modal/seleccionar-sprint/seleccionar-sprint.component';
import {SeleccionarHistoriaUsuarioComponent} from './modal/seleccionar-historia-usuario/seleccionar-historia-usuario.component';
import {CargarDatosModalComponent} from './modal/cargar-datos-modal/cargar-datos-modal.component';
import { TrabajoComponent } from './trabajo/trabajo.component';
import { EquipoComponent } from './equipo/equipo.component';
import { SprintBacklogComponent } from './sprint-backlog/sprint-backlog.component';

@NgModule({
  declarations: [
    AppComponent,
    EsquemaComponent,
    CrearSprintComponent,
    CrearHistoriaUsuarioComponent,
    AsignarHistoriaUsuarioComponent,
    DesarrollarHistoriaUsuarioComponent,
    CrearProyectoComponent,
    SeleccionarRolComponent,
    SeleccionarMiembroComponent,
    IngresarValorHojaComponent,
    SprintsComponent,
    ProyectosComponent,
    MiembrosComponent,
    RolesComponent,
    HistoriasUsuarioComponent,
    SeleccionarProyectoComponent,
    SeleccionarSprintComponent,
    SeleccionarHistoriaUsuarioComponent,
    CargarDatosModalComponent,
    TrabajoComponent,
    EquipoComponent,
    SprintBacklogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    SeleccionarRolComponent,
    SeleccionarMiembroComponent,
    IngresarValorHojaComponent,
    SeleccionarProyectoComponent,
    SeleccionarSprintComponent,
    SeleccionarHistoriaUsuarioComponent,
    CargarDatosModalComponent
  ]
})
export class AppModule {
}
