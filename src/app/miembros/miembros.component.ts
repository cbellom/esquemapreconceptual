import { Component, OnInit } from '@angular/core';
import {MiembrosDataService} from '../servicios/miembros-data.service';
import {RolDataService} from '../servicios/rol-data.service';
import {Miembro} from '../modelos/miembro';

@Component({
  selector: 'app-miembros',
  templateUrl: './miembros.component.html',
  styleUrls: ['./miembros.component.scss']
})
export class MiembrosComponent implements OnInit {

  constructor(public miembrosDataService: MiembrosDataService, public rolDataService: RolDataService) { }

  members: Miembro[] = this.miembrosDataService.datos;
  roles: string[] = this.members.map(value => {
    return this.rolDataService.datos.find(value1 => value.rol === value1.id).nombre;
  });

  ngOnInit() {
    // console.log(this.rolDataService.datos);
  }

}
