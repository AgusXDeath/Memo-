import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarGrupoComponent } from './modal-agregar-grupo.component';

describe('ModalAgregarGrupoComponent', () => {
  let component: ModalAgregarGrupoComponent;
  let fixture: ComponentFixture<ModalAgregarGrupoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAgregarGrupoComponent]
    });
    fixture = TestBed.createComponent(ModalAgregarGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
