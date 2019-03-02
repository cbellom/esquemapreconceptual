import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarHistoriaUsuarioComponent } from './asignar-historia-usuario.component';

describe('AsignarHistoriaUsuarioComponent', () => {
  let component: AsignarHistoriaUsuarioComponent;
  let fixture: ComponentFixture<AsignarHistoriaUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarHistoriaUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarHistoriaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
