import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarDatosModalComponent } from './cargar-datos-modal.component';

describe('CargarDatosModalComponent', () => {
  let component: CargarDatosModalComponent;
  let fixture: ComponentFixture<CargarDatosModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarDatosModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarDatosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
