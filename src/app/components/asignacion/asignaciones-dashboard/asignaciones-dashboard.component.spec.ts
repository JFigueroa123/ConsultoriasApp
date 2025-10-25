import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionesDashboardComponent } from './asignaciones-dashboard.component';

describe('AsignacionesDashboardComponent', () => {
  let component: AsignacionesDashboardComponent;
  let fixture: ComponentFixture<AsignacionesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsignacionesDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignacionesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
