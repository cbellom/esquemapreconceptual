import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-crear-sprint',
  templateUrl: './crear-sprint.component.html',
  styleUrls: ['./crear-sprint.component.scss']
})
export class CrearSprintComponent implements OnInit {
  guardarActivo: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navegarEsquema() {
    this.router.navigateByUrl('/esquema');
  }

  guardar() {

  }
}
