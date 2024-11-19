import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarFuncionComponent } from './modal-agregar-funciones.component';

describe('ModalAgregarFuncionesComponent', () => {
  let component: ModalAgregarFuncionComponent;
  let fixture: ComponentFixture<ModalAgregarFuncionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAgregarFuncionComponent]
    });
    fixture = TestBed.createComponent(ModalAgregarFuncionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
