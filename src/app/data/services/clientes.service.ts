import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, first, map } from 'rxjs';
import { SweetAlerService } from './sweetAler.service';
import { ClientesI } from '../models/clientes.interface';
import { VisitasClientesI } from '../models/visitasClientes.interface';

import { QueryFilter } from '../../shared/tabla/models/configTabla.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

    // urlBase: string = environment.urlConsultoriasApiGateway;
    urlBase: string = environment.UrlAguilaApi2;

    constructor(private http: HttpClient) { }

   getClientes(){
    
    return this.http.get(`${this.urlBase}/clientes`).pipe(
    map((response: any)=> response.appData as any[]));
  }

  postClientes(cliente: ClientesI){
    return this.http.post(`${this.urlBase}/clientes`, cliente).pipe(
    map((response: any)=> response.appData as any[]));
  }

  updateCliente(cliente: ClientesI){
    let id=cliente.id;
    return this.http.put(`${this.urlBase}/clientes/`+id, cliente).pipe(
    map((response: any)=> response.appData as any[]));
  }

  updateVisitaCliente(visitaCliente: VisitasClientesI){
    let id=visitaCliente.id;
    return this.http.put(`${this.urlBase}/VisitasClientes/`+id, visitaCliente).pipe(
    map((response: any)=> response.appData as any[]));
  }

  getEstados(){
    return this.http.get(`${this.urlBase}/estados`).pipe(
    map((response: any)=> response.appData as any[]));
  }



}
