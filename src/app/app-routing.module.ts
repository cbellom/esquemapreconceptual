import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EsquemaComponent} from './esquema/esquema.component';
import {CrearSprintComponent} from './crear-sprint/crear-sprint.component';
import {AsignarHistoriaUsuarioComponent} from './asignar-historia-usuario/asignar-historia-usuario.component';
import {CrearHistoriaUsuarioComponent} from './crear-historia-usuario/crear-historia-usuario.component';
import {DesarrollarHistoriaUsuarioComponent} from './desarrollar-historia-usuario/desarrollar-historia-usuario.component';
import {CrearProyectoComponent} from './crear-proyecto/crear-proyecto.component';

const routes: Routes = [
  {path: '', redirectTo: '/esquema', pathMatch: 'full'},
  {path: 'esquema', component: EsquemaComponent},
  {path: 'crear-proyecto', component: CrearProyectoComponent},
  {path: 'crear-sprint', component: CrearSprintComponent},
  {path: 'asignar-historia-usuario', component: AsignarHistoriaUsuarioComponent},
  {path: 'crear-historia-usuario', component: CrearHistoriaUsuarioComponent},
  {path: 'desarrollar-historia-usuario', component: DesarrollarHistoriaUsuarioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
