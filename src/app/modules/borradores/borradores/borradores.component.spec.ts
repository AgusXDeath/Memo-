import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorradoresComponent } from './borradores.component';

describe('BorradoresComponent', () => {
  let component: BorradoresComponent;
  let fixture: ComponentFixture<BorradoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorradoresComponent]
    });
    fixture = TestBed.createComponent(BorradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
