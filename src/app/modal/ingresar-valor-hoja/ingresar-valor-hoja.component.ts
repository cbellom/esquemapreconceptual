import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TipoDatoHoja} from '../../modelos/tipo-dato-hoja';

@Component({
  selector: 'app-ingresar-valor-hoja',
  templateUrl: './ingresar-valor-hoja.component.html',
  styleUrls: ['./ingresar-valor-hoja.component.scss']
})
export class IngresarValorHojaComponent implements OnInit {
  valor: any;
  nombre: string;
  tipoDatoHoja: TipoDatoHoja;
  TipoDatoHoja = TipoDatoHoja;

  constructor(private dialogRef: MatDialogRef<IngresarValorHojaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { tipoDatoHoja: TipoDatoHoja, nombre: string }) {
  }

  ngOnInit() {
    this.nombre = this.data.nombre;
    this.tipoDatoHoja = this.data.tipoDatoHoja;
  }

  cerrar() {
    this.dialogRef.close(this.valor);
  }

}
