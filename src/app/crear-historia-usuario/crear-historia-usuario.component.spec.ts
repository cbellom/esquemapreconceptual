import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearHistoriaUsuarioComponent } from './crear-historia-usuario.component';

describe('CrearHistoriaUsuarioComponent', () => {
  let component: CrearHistoriaUsuarioComponent;
  let fixture: ComponentFixture<CrearHistoriaUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearHistoriaUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearHistoriaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
