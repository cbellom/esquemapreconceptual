import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesarrollarHistoriaUsuarioComponent } from './desarrollar-historia-usuario.component';

describe('DesarrollarHistoriaUsuarioComponent', () => {
  let component: DesarrollarHistoriaUsuarioComponent;
  let fixture: ComponentFixture<DesarrollarHistoriaUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesarrollarHistoriaUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesarrollarHistoriaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
