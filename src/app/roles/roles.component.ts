import { Component, OnInit } from '@angular/core';
import {RolDataService} from '../servicios/rol-data.service';
import {Rol} from '../modelos/rol';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  constructor(public rolDataService: RolDataService) {
  }

  roles: Rol[] = this.rolDataService.datos;

  ngOnInit() {
  }

}
