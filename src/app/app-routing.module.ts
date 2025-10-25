import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { AsignacionComponent } from './components/asignacion/asignacion.component';
import { VisitasComponent } from './components/visitas/visitas.component';
import { ClientesDashboardComponent } from './components/clientes/clientes-dashboard/clientes-dashboard.component';
import { AsignacionesDashboardComponent } from './components/asignacion/asignaciones-dashboard/asignaciones-dashboard.component';

//RUTAS
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirige / a /home
      { path: 'home', component: HomeComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'clientes-dashboard', component: ClientesDashboardComponent },
      { path: 'asignacion', component: AsignacionComponent },
      { path: 'asignacion-dashboard', component: AsignacionesDashboardComponent },
      { path: 'visitas', component: VisitasComponent },
      // { path: 'configuracion', component: ConfiguracionComponent }
    ]
  },
  
  { path: '404', component: LoginComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }