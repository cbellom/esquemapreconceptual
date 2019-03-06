import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarHistoriaUsuarioComponent } from './seleccionar-historia-usuario.component';

describe('SeleccionarHistoriaUsuarioComponent', () => {
  let component: SeleccionarHistoriaUsuarioComponent;
  let fixture: ComponentFixture<SeleccionarHistoriaUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarHistoriaUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarHistoriaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
