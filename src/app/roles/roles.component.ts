import {Component, OnInit} from '@angular/core';
import {RolDataService} from '../servicios/rol-data.service';
import {Rol} from '../modelos/rol';
import {Router} from '@angular/router';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  public roles: Rol[] = [];

  constructor(private router: Router,
              public rolDataService: RolDataService) {
  }

  ngOnInit() {
    this.roles = this.rolDataService.datos;
  }


  navegarEsquema() {
    this.router.navigateByUrl('/esquema');
  }

}
