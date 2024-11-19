import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaFuncionesComponent } from './table-funciones.component';

describe('TableFuncionesComponent', () => {
  let component: TablaFuncionesComponent;
  let fixture: ComponentFixture<TablaFuncionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaFuncionesComponent]
    });
    fixture = TestBed.createComponent(TablaFuncionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
