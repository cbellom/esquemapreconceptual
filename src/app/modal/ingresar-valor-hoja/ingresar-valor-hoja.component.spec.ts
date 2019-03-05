import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarValorHojaComponent } from './ingresar-valor-hoja.component';

describe('IngresarValorHojaComponent', () => {
  let component: IngresarValorHojaComponent;
  let fixture: ComponentFixture<IngresarValorHojaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresarValorHojaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarValorHojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
