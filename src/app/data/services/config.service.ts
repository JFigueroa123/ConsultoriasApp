import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { SweetAlerService } from './sweetAler.service';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, first, forkJoin, map, throwError } from 'rxjs';
import { RolOpcionesMenu, Usuario, usuarioI } from '../models/usuario.interface';
import { environment } from '../../../environments/environment';
import { UsuarioOpcionesMenuN1I } from '../models/usuarioOpcionesMenuN1';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private cargando = new BehaviorSubject<boolean>(true);
  public usuario: Usuario | null = new Usuario() ;
  // private baseUrl: string = environment.urlConsultoriasApiGateway;
  private baseUrl: string = environment.UrlAguilaApi2;

  public UsuarioOpcionesMenu = new BehaviorSubject<RolOpcionesMenu[]>([]);
  // public usuarioActual = new BehaviorSubject<usuarioI[]>(null);


  constructor(   
    private http: HttpClient,
    private loginService: LoginService,
    public sweetService: SweetAlerService,
    private router: Router) 
    { 
      this.cargarDatos();
    }

    cargarDatos() {
    if (this.loginService.isAuthenticated()) {
      this.cargarUsuario();
    } else {
      this.router.navigate(["/login"]);
      this.cargando.next(false);
    }
  }

   cargarUsuario() {
    this.usuario = this.loginService.usuario;
    
    //Validamos si el usuario existe
    if (this.usuario) {      
      this.UsuarioOpcionesMenu.next(this.usuario.usuarioRol.rol.rolOpcionesMenu);        
      }else {
        this.sweetService.sweet_alerta(
          "Error",
          "No fue posible obtener los módulos asiganados al usuario",
          "error"
        );
        this.loginService.logout();
        this.router.navigate(["/login"]);
        this.cargando.next(false);
      }
  }

}
