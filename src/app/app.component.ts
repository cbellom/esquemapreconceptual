import {Component, OnInit} from '@angular/core';
import {SprintbacklogDataService} from './servicios/sprint-backlog-data.service';
import {ProyectoDataService} from './servicios/proyecto-data.service';
import {SprintsDataService} from './servicios/sprint-data.service';
import {EquipoDataService} from './servicios/equipo-data.service';
import {Sprint} from './modelos/sprint';
import {Equipo, EstadoEquipo} from './modelos/equipo';
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
  }


  private actualizarVelocidades() {
    this.sprintbacklogDataService.datos$.subscribe(backlog => {
      console.log('Actualizando velocidades');
      let sprints: Sprint[] = [];
      this.proyectoDataService.datos.forEach(proyecto => {
        let velocidadAnterior = null;
        const sprintsDelProyecto: Sprint[] = this.obtenerSprintsOrdenados(proyecto);
        const sprintActualizados: Sprint[] = sprintsDelProyecto.map((sprint) => {
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
    const historiasDesarrolladas = backlog.filter(x => x.idSprint === sprint.id);
    sprint.velocidadEstimada = velocidadAnterior;
    sprint.velocidadReal = historiasDesarrolladas.length === 0
      ? null
      : historiasDesarrolladas.map(x => x.tamano ? x.tamano : 0).reduce((a, b) => a + b, 0);
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
    this.actualizarForecast();
  }

  private actualizarForecast() {
    // TODO
    console.log('Actualizando forecast horizont');
  }

  private actualizarDesviacion() {
    this.sprintsDataService.datos$.subscribe(() => {
      console.log('Actualizando desviacion estandar');
      const equipos: Equipo[] = [];
      this.proyectoDataService.datos.forEach(proyecto => {
        const sprintsDelProyecto: Sprint[] = this.obtenerSprintsOrdenados(proyecto)
          .filter(value => value.velocidadReal !== null);
        const desviacionEstandar = sprintsDelProyecto.length > 0
          ? this.standardDeviation(sprintsDelProyecto.map(value1 => value1.velocidadReal))
          : null;
        const porcentajeDesviacionEstandar = sprintsDelProyecto.length > 0
          ? desviacionEstandar / sprintsDelProyecto[sprintsDelProyecto.length - 1].velocidadEstimada * 100
          : null;
        const equipoActualizado: Equipo = {
          idProyecto: proyecto.id,
          estado: porcentajeDesviacionEstandar !== null ? (porcentajeDesviacionEstandar <= 10
            ? EstadoEquipo.formado
            : EstadoEquipo.sembrado)
          : null,
          desviacionEstandar: desviacionEstandar,
          porcentajeDesviacionEstandar: porcentajeDesviacionEstandar
        };
        equipos.push(equipoActualizado);
      });
      setTimeout(() => this.equipoDataService.setData(equipos), 2000);
    });
  }

  private standardDeviation(values: any[]) {
    const avg = this.average(values);

    const squareDiffs = values.map(function (value) {
      const diff = value - avg;
      const sqrDiff = diff * diff;
      return sqrDiff;
    });

    const avgSquareDiff = this.average(squareDiffs);

    const stdDev = Math.sqrt(avgSquareDiff);
    return stdDev;
  }

  private average(data: any[]) {
    const sum = data.reduce(function (x, value) {
      return x + value;
    }, 0);

    const avg = sum / data.length;
    return avg;
  }
}
