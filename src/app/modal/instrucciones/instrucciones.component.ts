import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {StepsDataService} from '../../servicios/steps.service';

@Component({
  selector: 'app-instrucciones',
  templateUrl: './instrucciones.component.html',
  styleUrls: ['./instrucciones.component.scss']
})

export class InstruccionesComponent implements OnInit {

  public specificSteps: any;

  constructor(private stepsDataService: StepsDataService,
              private dialogRef: MatDialogRef<InstruccionesComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { specificSteps: any }) { }

  ngOnInit() {
    this.specificSteps = this.data.specificSteps;
  }

  cerrar() {
    this.dialogRef.close();
  }
}
