import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService<T> {
  public datos: T;
  public datos$: Subject<T> = new Subject();
  protected identificacdor: string;

  constructor() {
    this.initialize();
  }

  protected initialize() {
    console.log('init');
    this.load();
  }

  setData(datos: any) {
    this.datos = datos;
    this.datos$.next(datos);
    localStorage.setItem(this.identificacdor, JSON.stringify(datos));
  }

  load() {
    const datos = localStorage.getItem(this.identificacdor);
    this.datos = JSON.parse(datos);
    this.datos$.next(this.datos);
  }

}
