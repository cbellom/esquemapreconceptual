import {Component, OnInit} from '@angular/core';
import {EquipoDataService} from '../servicios/equipo-data.service';
import {HistoriasUsuarioDataService} from '../servicios/historia-usuario-data.service';
import {MiembrosDataService} from '../servicios/miembros-data.service';
import {ProyectoDataService} from '../servicios/proyecto-data.service';
import {RolDataService} from '../servicios/rol-data.service';
import {SprintsDataService} from '../servicios/sprint-data.service';
import {SprintbacklogDataService} from '../servicios/sprint-backlog-data.service';
import {TrabajoDataService} from '../servicios/trabajo-data.service';
import {MatDialog} from '@angular/material';
import {CargarDatosModalComponent} from '../modal/cargar-datos-modal/cargar-datos-modal.component';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-esquema',
  templateUrl: './esquema.component.html',
  styleUrls: ['./esquema.component.scss']
})
export class EsquemaComponent implements OnInit {

  constructor(private a: EquipoDataService,
              private b: HistoriasUsuarioDataService,
              private c: MiembrosDataService,
              private d: ProyectoDataService,
              private e: RolDataService,
              private f: SprintbacklogDataService,
              private g: SprintsDataService,
              private h: TrabajoDataService,
              public dialog: MatDialog,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  cargarDatos() {
    this.dialog.open(CargarDatosModalComponent, {
      width: '350px'
    });
  }

  descargarDatos() {
    const equipos = this.a.datos;
    const historiasUsuario = this.b.datos;
    const miembros = this.c.datos;
    const proyectos = this.d.datos;
    const rol = this.e.datos;
    const sprintbacklog = this.f.datos;
    const sprints = this.g.datos;
    const trabajos = this.h.datos;

    const data = {
      equipos,
      historiasUsuario,
      miembros,
      proyectos,
      rol,
      sprintbacklog,
      sprints,
      trabajos
    };

    const jsonse = JSON.stringify(data);
    const blob = new Blob([jsonse], {type: 'application/json'});
    const enlaceTemporal: any = document.createElement('a');
    document.body.appendChild(enlaceTemporal);
    enlaceTemporal.style = 'display: none';
    const url = window.URL.createObjectURL(blob);
    const safeURL: any = this.sanitizer.bypassSecurityTrustUrl(url);
    enlaceTemporal.href = safeURL.changingThisBreaksApplicationSecurity;
    enlaceTemporal.download = 'datosesquemapreconceptual';
    enlaceTemporal.click();
    window.URL.revokeObjectURL(url);
  }
}
