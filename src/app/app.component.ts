import {Component, OnInit} from '@angular/core';
import {SprintbacklogDataService} from './servicios/sprint-backlog-data.service';
import {ProyectoDataService} from './servicios/proyecto-data.service';
import {SprintsDataService} from './servicios/sprint-data.service';
import {EquipoDataService} from './servicios/equipo-data.service';
import {Sprint} from './modelos/sprint';
import {EstadoEquipo} from './modelos/equipo';
import {SprintBacklog} from './modelos/sprint-backlog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'esquemapreconceptual';


  constructor(private proyectoDataService: ProyectoDataService,
              private sprintsDataService: SprintsDataService,
              private equipoDataService: EquipoDataService,
              private sprintbacklogDataService: SprintbacklogDataService) {
  }

  ngOnInit() {
    this.actualizarVelocidades();
    this.actualizarMetricas();
    this.actualizarEstadoHistoriaDeUsuario();
  }


  private actualizarVelocidades() {
    this.sprintbacklogDataService.datos$.subscribe(backlog => {
      let sprints: Sprint[] = [];
      this.proyectoDataService.datos.forEach(proyecto => {
        let velocidadAnterior = null;
        const sprintsDelProyecto: Sprint[] = this.obtenerSprintsOrdenados(proyecto);
        const sprintActualizados: Sprint[] = sprintsDelProyecto.map((sprint, index) => {
          sprint = this.actualizarVelocidadesSprint(sprint, velocidadAnterior, backlog);
          velocidadAnterior = sprint.velocidadReal;
          return sprint;
        });
        sprints = sprints.concat(sprintActualizados);
      });
      setTimeout(() => this.sprintsDataService.setData(sprints), 2000);
    });
  }

  private actualizarVelocidadesSprint(sprint: Sprint, velocidadAnterior: number, backlog: SprintBacklog[]): Sprint {
    sprint.velocidadEstimada = velocidadAnterior;
    sprint.velocidadReal = backlog.filter(x => x.idSprint === sprint.id)
      .map(x => x.tamano ? x.tamano : 0)
      .reduce((a, b) => a + b, 0);
    return sprint;
  }

  private obtenerSprintsOrdenados(proyecto) {
    return this.sprintsDataService.datos.filter(sprint => {
      return sprint.idProyecto === proyecto.id;
    }).sort((a, b) => a.id - b.id);
  }

  private actualizarMetricas() {
    // TODO
    this.actualizarDesviacion();
  }


  private actualizarEstadoHistoriaDeUsuario() {
    // TODO
  }

  private actualizarDesviacion() {
    // todo
    this.sprintsDataService.datos$.subscribe(value => {
      console.log('Los datos cambiaron!!!', value);
      console.log('Los datos del equibo son:', this.equipoDataService.datos);
      const equipoActualizado = this.equipoDataService.datos;
      // TODO: Logica para actualizar datos
      equipoActualizado.estado = null;
      equipoActualizado.porcentajeDesviacionEstandar = 0;
      this.equipoDataService.setData(equipoActualizado);
    });
  }
}
