import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarProyectoComponent } from './seleccionar-proyecto.component';

describe('SeleccionarProyectoComponent', () => {
  let component: SeleccionarProyectoComponent;
  let fixture: ComponentFixture<SeleccionarProyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarProyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
