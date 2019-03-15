import {Component, OnInit} from '@angular/core';
import {SprintbacklogDataService} from './servicios/sprint-backlog-data.service';
import {ProyectoDataService} from './servicios/proyecto-data.service';
import {SprintsDataService} from './servicios/sprint-data.service';
import {EquipoDataService} from './servicios/equipo-data.service';
import {Sprint} from './modelos/sprint';
import {EstadoEquipo} from './modelos/equipo';

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
              private sprintbacklogDataService: SprintbacklogDataService,) {
  }

  ngOnInit() {
    this.actualizarVelocidades();
    this.actualizarMetricas();
    this.actualizarEstadoHistoriaDeUsuario();
  }


  private actualizarVelocidades() {
    // TODO


    this.sprintbacklogDataService.datos$.subscribe(backlog => {
      const sprints: Sprint[] = [];
      this.proyectoDataService.datos.forEach(proyecto => {
        const sprintsDelProyecto: Sprint[] = this.sprintsDataService.datos.filter(sprint => {
          return sprint.idProyecto === proyecto.id;
        }).sort((a, b) => a.id - b.id);

        console.log('1 ', sprintsDelProyecto);

        const sprintActualizados: Sprint[] = sprintsDelProyecto.map((sprint, index) => {
          sprint.velocidadEstimada = index - 1 >= 0 ? sprintsDelProyecto[index - 1].velocidadReal : null;
          sprint.velocidadReal = backlog.filter(x => x.idSprint === sprint.id)
            .map(x => x.tamano ? x.tamano : 0)
            .reduce((a, b) => a + b, 0);
          return sprint;
        });
        sprints.concat(sprintActualizados);
      });
      this.sprintsDataService.setData(sprints);
    });
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
