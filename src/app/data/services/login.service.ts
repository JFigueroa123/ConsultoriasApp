import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SweetAlerService } from './sweetAler.service';
import { Router } from '@angular/router';
import { loginDtoI } from '../models/loginDto.interface';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario, usuarioI } from '../models/usuario.interface';
import { opcionesMenuN1I } from '../models/opcionesMenuN1.interface';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  // private urlEndPoint: string = environment.urlConsultoriasApiGateway;
  private urlEndPoint: string = environment.UrlAguilaApiSeguridad;


  private _usuario!: usuarioI | null;
  private _opcionesMenu: opcionesMenuN1I[]= [];
  private _token!: string | null ;


  constructor(
    private http: HttpClient,
    private sweetService: SweetAlerService,
    private router: Router
  ) { }


   // este metodo personalizado, regresa el usuario si ya fue seteado, si no lo busca en el session storage
  public get usuario(): Usuario | null {
    if (this._usuario != null) {
      return this._usuario;
    }
    if (this._usuario == null && sessionStorage.getItem("usuario") != null) {
      // si se encuentra el usuario en el session storage lo traemos de nuevo
      // utilizamos JSON.parse para convertir el string en un objeto de tipo usuario
      const usuarioString = sessionStorage.getItem("usuario");
      if (usuarioString) {
        this._usuario = JSON.parse(usuarioString) as Usuario;
      } else {
        this._usuario = new Usuario(); // O asigna null si es permitido
      }

      return this._usuario;
    }
    return null;
  }

  public get token(): string | null {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem("token") != null) {
      // si se encuentra el token en el session storage lo traemos de nuevo
      this._token = sessionStorage.getItem("token");
      return this._token;
    }
    return null;
  }


  //Metodo para iniciar Sesion, devuelve un token con la informacion del usuario
  login(login: loginDtoI): Observable<any> {
    // this.sweetService.sweet_carga("Iniciando Sesión");
    return this.http.post(this.urlEndPoint + "/seguridad", login).pipe(
      map((response: any) => response.token as string),
      catchError((e) => {
        console.log(e);
        this.mostrarError(e);
        return throwError(e);
      })
    );
  }


  logout(): void {
    this._token = null;
    this._usuario = null;

    sessionStorage.clear();    
    this.router.navigate(["/login"]);
  }

  //Muestra una alerta cuando se produce un error en las peticiones al endPoint
  mostrarError(e: any) {
    console.log(e);
    try {
      this.sweetService.sweet_alerta(
        e.error.aguilaErrores[0].titulo,
        e.error.aguilaErrores[0].detalle,
        "error"
      );
    } catch (error) {
      this.sweetService.sweet_alerta(
        `Error ${e.status}`,
        `No es posible interpretar el error, comuníquese con el administrador del sistema.`,
        "error"
      );
    }
  }

    isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.UserName && payload.UserName.length > 0) {
      return true;
    }
    return false;
  }

  obtenerDatosToken(accessToken: any): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  setAuthenticatedUser(accessToken: string): Observable<Usuario> {
    // Obtenemos el token que regresa Login y obtenemos el usuario desde el api
    // Con el Objetivo de obtener correctamente los Authorities y todos los permisos que tenga el usuario
    let payload = this.obtenerDatosToken(accessToken);
    let id = payload.UsuarioId; //Cambiar Con nuevo endpoint
    return this.http
      .get<Usuario>(`${this.urlEndPoint}/Usuarios/${id}`)
      .pipe(
        map((response: any) => response.appData as usuarioI),
        tap((usuario) => {
          this._usuario = usuario;
          this._opcionesMenu = usuario.usuarioRol?.rol.rolOpcionesMenu?.map(i => i.opcionMenuN1).filter((o): o is opcionesMenuN1I => o !== undefined)?? [];
          // Guardamos el usuario en el session storage
          sessionStorage.setItem("usuario", JSON.stringify(usuario));
        }),
        catchError((e) => {
          console.log(e);
          this.mostrarError(e);
          return throwError(e);
        })
      );
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem("token", accessToken);
  }

  
}
