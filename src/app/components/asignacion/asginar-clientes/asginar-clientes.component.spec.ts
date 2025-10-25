import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsginarClientesComponent } from './asginar-clientes.component';

describe('AsginarClientesComponent', () => {
  let component: AsginarClientesComponent;
  let fixture: ComponentFixture<AsginarClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsginarClientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsginarClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
