import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {EsquemaComponent} from './esquema/esquema.component';
import {CrearSprintComponent} from './crear-sprint/crear-sprint.component';
import {CrearHistoriaUsuarioComponent} from './crear-historia-usuario/crear-historia-usuario.component';
import {AsignarHistoriaUsuarioComponent} from './asignar-historia-usuario/asignar-historia-usuario.component';
import {DesarrollarHistoriaUsuarioComponent} from './desarrollar-historia-usuario/desarrollar-historia-usuario.component';
import { CrearProyectoComponent } from './crear-proyecto/crear-proyecto.component';
import {MaterialModule} from './material/material.module';
import { SeleccionarRolComponent } from './modal/seleccionar-rol/seleccionar-rol.component';
import { SeleccionarMiembroComponent } from './modal/seleccionar-miembro/seleccionar-miembro.component';
import { SprintsComponent } from './sprints/sprints.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { MiembrosComponent } from './miembros/miembros.component';
import { RolesComponent } from './roles/roles.component';

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
    SprintsComponent,
    ProyectosComponent,
    MiembrosComponent,
    RolesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    SeleccionarRolComponent,
    SeleccionarMiembroComponent
  ]
})
export class AppModule { }
