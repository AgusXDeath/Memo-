import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaGruposFuncionesComponent } from './table-grupo-funciones.component';

describe('TableGrupoFuncionesComponent', () => {
  let component: TablaGruposFuncionesComponent;
  let fixture: ComponentFixture<TablaGruposFuncionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaGruposFuncionesComponent]
    });
    fixture = TestBed.createComponent(TablaGruposFuncionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
