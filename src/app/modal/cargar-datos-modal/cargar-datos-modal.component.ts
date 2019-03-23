import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {EquipoDataService} from '../../servicios/equipo-data.service';
import {HistoriasUsuarioDataService} from '../../servicios/historia-usuario-data.service';
import {MiembrosDataService} from '../../servicios/miembros-data.service';
import {ProyectoDataService} from '../../servicios/proyecto-data.service';
import {RolDataService} from '../../servicios/rol-data.service';
import {SprintbacklogDataService} from '../../servicios/sprint-backlog-data.service';
import {SprintsDataService} from '../../servicios/sprint-data.service';
import {TrabajoDataService} from '../../servicios/trabajo-data.service';

@Component({
  selector: 'app-load-game-modal',
  templateUrl: './cargar-datos-modal.component.html',
  styleUrls: ['./cargar-datos-modal.component.scss']
})
export class CargarDatosModalComponent implements OnInit {
  loading = false;
  fileName;
  formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  constructor(private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              public dialogRef: MatDialogRef<CargarDatosModalComponent>,
              private a: EquipoDataService,
              private b: HistoriasUsuarioDataService,
              private c: MiembrosDataService,
              private d: ProyectoDataService,
              private e: RolDataService,
              private f: SprintbacklogDataService,
              private g: SprintsDataService,
              private h: TrabajoDataService) {
  }

  onFileChange(event) {
    const x = event.target.files[0];
    this.fileName = x.name;
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsText(file);

      reader.onload = () => {
        this.formGroup.patchValue({
          file: reader.result
        });

        this.cd.markForCheck();
      };
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    const jsonFile = this.formGroup.get('file').value;

    const gameData: {
      equipos,
      historiasUsuario,
      miembros,
      proyectos,
      rol,
      sprintbacklog,
      sprints,
      trabajos
    } = JSON.parse(jsonFile);

    this.a.setData(gameData.equipos);
    this.h.setData(gameData.trabajos);
    this.c.setData(gameData.miembros);
    this.d.setData(gameData.proyectos);
    this.e.setData(gameData.rol);
    this.g.setData(gameData.sprints);
    this.b.setData(gameData.historiasUsuario);
    this.f.setData(gameData.sprintbacklog);

    this.loading = true;
    setTimeout(() => {
      this.dialogRef.close();
      this.loading = false;
    }, 2000);
  }


}
