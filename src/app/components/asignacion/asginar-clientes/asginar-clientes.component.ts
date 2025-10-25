import { Component, OnInit, ViewChild } from '@angular/core';
import { AsignacionService } from '../../../data/services/asignacion.service';
import { SweetAlerService } from '../../../data/services/sweetAler.service';
import { usuarioI } from '../../../data/models/usuario.interface';
import { ClientesI } from '../../../data/models/clientes.interface';
import { VisitasClientesI } from '../../../data/models/visitasClientes.interface';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import moment from 'moment';

@Component({
  selector: 'app-asginar-clientes',
  templateUrl: './asginar-clientes.component.html',
  styleUrl: './asginar-clientes.component.scss'
})
export class AsginarClientesComponent implements OnInit{

  public listadoTecnicos: usuarioI[]=[];
  public listadoClientes: ClientesI[]=[];

  tecnicoSeleccionado: number | null = null;
  fechaSeleccionada: string | null = null;

  selection = new SelectionModel<ClientesI>(true, []);  

  constructor(private service: AsignacionService, private sw: SweetAlerService){}


  ngOnInit(): void {   
    this.cargarPaginaFiltros();
  } 


  cargarPaginaFiltros() {
      this.sw.sweet_carga("Consultando datos. Espere.....");
  
      this.service.getTecnicos().subscribe({
        next: (res) => {
          this.listadoTecnicos = res;
          this.sw.sweet_notificacion("Datos cargados correctamente", 3000);
        },
        error: (err) => {
          this.sw.sweet_Error(err);
          console.error('Error al cargar los técnicos', err);
        }
      });


    this.service.getClientes().subscribe({
      next: (res) => {
        this.listadoClientes = res;
        this.sw.sweet_notificacion("Datos cargados correctamente", 3000);
      },
      error: (err) => {
        this.sw.sweet_Error(err)
        console.error('Error al cargar los clientes', err);
      }
    });      
  }


  guardarAsignacion(cliente: ClientesI){
    if(!this.tecnicoSeleccionado){
      this.sw.sweet_alerta("Seleccione Técnico", "Debe seleccionar un técnico antes de realizar la asignación", "warning");
      return;
    }

      if(!this.fechaSeleccionada){
      this.sw.sweet_alerta("Seleccione Fecha", "Debe seleccionar una fecha antes de realizar la asignación", "warning");
      return;
    }

    let visitaCliente: VisitasClientesI={
      id: 0,
      idCliente: cliente.id,
      idTecnico: this.tecnicoSeleccionado,
      fechaVisita: moment(this.fechaSeleccionada).format("DD-MM-YYYY"),
      observaciones:"ninguna",
      idEstado:1,
      fechaHoraLlegada: null,
      fechaHoraSalida: null
    }

    this.sw.sweet_carga("Guardando Asignación")
    this.service.postVisitasClientes(visitaCliente).subscribe({
      next: (res) => {
        this.sw.sweet_notificacion("Datos cargados correctamente", 3000);
        const index = this.listadoClientes.findIndex(c => c.id === cliente.id);
        this.removerClienteList(index);       
       
      },
      error: (err) => {
        this.sw.sweet_Error(err)
        console.error('Error al guardar la asignación', err);
      }     
    });
  }

  removerClienteList(index: number){
    this.listadoClientes.splice(index, 1);
  }




}
