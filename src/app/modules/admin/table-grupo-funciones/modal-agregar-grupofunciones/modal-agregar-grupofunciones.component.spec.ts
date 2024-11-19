import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarGrupofuncionesComponent } from './modal-agregar-grupofunciones.component';

describe('ModalAgregarGrupofuncionesComponent', () => {
  let component: ModalAgregarGrupofuncionesComponent;
  let fixture: ComponentFixture<ModalAgregarGrupofuncionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAgregarGrupofuncionesComponent]
    });
    fixture = TestBed.createComponent(ModalAgregarGrupofuncionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
