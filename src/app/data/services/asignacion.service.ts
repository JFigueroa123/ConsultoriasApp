import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, first, map } from 'rxjs';
import { SweetAlerService } from './sweetAler.service';
import { ClientesI } from '../models/clientes.interface';
import { VisitasClientesI } from '../models/visitasClientes.interface';

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {

    urlBaseSeg: string = environment.UrlAguilaApiSeguridad;
    // urlBase: string = environment.urlConsultoriasApiGateway;
    urlBase: string = environment.UrlAguilaApi2;


    constructor(private http: HttpClient) { }

   getVisitasClientes(){
    return this.http.get(`${this.urlBase}/VisitasClientes`).pipe(
    map((response: any)=> response.appData as any[]));
  }

   postVisitasClientes(vistaCliente: VisitasClientesI){
    return this.http.post(`${this.urlBase}/VisitasClientes`, vistaCliente).pipe(
    map((response: any)=> response.appData as any[]));
  }

  postClientes(cliente: ClientesI){
    return this.http.post(`${this.urlBase}/usuarios`, cliente).pipe(
    map((response: any)=> response.appData as any[]));
  }

  updateCliente(cliente: ClientesI){
    let id=cliente.id;
    return this.http.put(`${this.urlBase}/usuarios/`+id, cliente).pipe(
    map((response: any)=> response.appData as any[]));
  }


  getTecnicos(){
    return this.http.get(`${this.urlBaseSeg}/usuarios/tecnicos`).pipe(
    map((response: any)=> response.appData as any[]));
  }

  getClientes(){
    return this.http.get(`${this.urlBase}/clientes`).pipe(
    map((response: any)=> response.appData as any[]));
  }



}
