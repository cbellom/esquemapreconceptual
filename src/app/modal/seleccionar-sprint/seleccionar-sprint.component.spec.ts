import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarSprintComponent } from './seleccionar-sprint.component';

describe('SeleccionarSprintComponent', () => {
  let component: SeleccionarSprintComponent;
  let fixture: ComponentFixture<SeleccionarSprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarSprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
