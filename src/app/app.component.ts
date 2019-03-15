import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'esquemapreconceptual';


  constructor() { }

  ngOnInit() {
    this.actualizarVelocidades();
    this.actualizarMetricas();
    this.actualizarEstadoHistoriaDeUsuario();
  }


  private actualizarVelocidades() {
    // TODO
  }

  private actualizarMetricas() {
    // TODO
  }


  private actualizarEstadoHistoriaDeUsuario() {
    // TODO
  }
}
