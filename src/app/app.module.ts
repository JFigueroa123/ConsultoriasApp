import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material/material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // 
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ClientesComponent } from './components/clientes/clientes.component';
import { AsignacionComponent } from './components/asignacion/asignacion.component';
import { VisitasComponent } from './components/visitas/visitas.component';
import { FooterComponent } from './components/footer/footer.component';
import { TablaComponent } from './shared/tabla/tabla.component';
import { FiltrosComponent } from './shared/filtros/filtros.component';
import { FormsModule } from '@angular/forms';
import { ClienteComponent } from './components/clientes/cliente/cliente.component';  // 👈 IMPORTANTE
import { GoogleMapsModule } from '@angular/google-maps';
import { AsginarClientesComponent } from './components/asignacion/asginar-clientes/asginar-clientes.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ClientesDashboardComponent } from './components/clientes/clientes-dashboard/clientes-dashboard.component';
import { AsignacionesDashboardComponent } from './components/asignacion/asignaciones-dashboard/asignaciones-dashboard.component';
// 👇 Importar ngx-echarts
import { NgxEchartsModule } from 'ngx-echarts';
import { VisitaComponent } from './components/visitas/visita/visita.component';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY', // cómo leer lo que escriba el usuario
  },
  display: {
    dateInput: 'DD/MM/YYYY', // cómo mostrarlo en el input
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LayoutComponent,
    LoginComponent,
    ClientesComponent,
    AsignacionComponent,
    VisitasComponent,
    FooterComponent,
    TablaComponent,
    FiltrosComponent,
    ClienteComponent,
    AsginarClientesComponent,
    ClientesDashboardComponent,
    AsignacionesDashboardComponent,
    VisitaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    HttpClientModule,
    FormsModule,
    GoogleMapsModule,
     NgxEchartsModule.forRoot({
      echarts: () => import('echarts') // Import dinámico recomendado
    })
    
  ],
  providers: [
    provideAnimationsAsync(),
     {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true, // ✅ Necesario para que puedan existir múltiples interceptores
    },

    provideNativeDateAdapter(), // 👈 aquí agregas el proveedor
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }, // idioma español
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
