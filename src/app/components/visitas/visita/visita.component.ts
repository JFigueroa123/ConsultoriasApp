import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../../../data/services/clientes.service';
import { SweetAlerService } from '../../../data/services/sweetAler.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { GoogleMapsLoaderService } from '../../../data/services/googleMaps.service';
import { ClientesI } from '../../../data/models/clientes.interface';
import { VisitasClientesI } from '../../../data/models/visitasClientes.interface';
import { EstadosI } from '../../../data/models/estados.interface';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-visita',
  templateUrl: './visita.component.html',
  styleUrl: './visita.component.scss'
})
export class VisitaComponent  implements OnInit{

    readonly dialog = inject(MatDialog);

    formCliente!: UntypedFormGroup;
    formVisitaCliente!: UntypedFormGroup;

    //update
    visitaClienteData: VisitasClientesI;
    listaEstados: EstadosI[] =[];
  
    title: string='Visitas A Clientes';
    
    constructor(private service: ClientesService, private fb: FormBuilder, private sw: SweetAlerService, private googleMapsLoader: GoogleMapsLoaderService,  @Inject(MAT_DIALOG_DATA) public data: VisitasClientesI){
      this.visitaClienteData = this.data;
    }
  
  
    ngOnInit(): void {
      this.cargarComponente();
    }
  
    configurarForm(){
  
      const currentDate = new Date().toISOString();
      this.formCliente = this.fb.group({
        id:               [{value: null, disabled: true}],
        nombres:          [{value: null, disabled: true}],
        apellidos:        [{value: null, disabled: true}],
        telefono:         [{value: null, disabled: true}],
        email:            [{value: null, disabled: true}],
        numeroDoc:        [{value: null, disabled: true}],
        direccion:        [{value: null, disabled: true}],
        activo:           [{value: true, disabled: true}],
      });

       this.formVisitaCliente = this.fb.group({
        id:               [{value: null,    disabled: false}],
        idCliente:        [{value: null,    disabled: false}],
        idTecnico:        [{value: null,    disabled: false}],
        fechaVisita:      [{value: null,    disabled: false}],
        observaciones:    [{value: null,    disabled: false}],
        idEstado:         [{value: null,    disabled: false}],
        fechaHoraLlegada: [{value: null,    disabled: false}],
        fechaHoraSalida:  [{value: null,    disabled: false}],
      });
      
    }
  
    cargarComponente(){

      this.configurarForm();


      forkJoin([
        this.service.getEstados(),
      ]).subscribe(res =>{
         this.listaEstados = res[0]; 
         
        this.formCliente.patchValue({
          id: this.visitaClienteData.cliente.nombres,
          apellidos: this.visitaClienteData.cliente.apellidos,
          telefono: this.visitaClienteData.cliente.telefono,
          email: this.visitaClienteData.cliente.email,
          numeroDoc: this.visitaClienteData.cliente.numeroDoc,
          direccion: this.visitaClienteData.cliente.direccion,
          activo: this.visitaClienteData.cliente.activo,
        });

        this.formVisitaCliente.patchValue(this.visitaClienteData)
      }, (err)=>{
        this.sw.sweet_Error(err);
      });
     
    } 
  
    isNuevo():boolean{
     return this.visitaClienteData===null? true: false
    }
  
 
    actualizarRegistro(){         
      this.sw.sweet_carga("Guardando registro. Espere.....");
      this.service.updateVisitaCliente(this.formVisitaCliente.value).subscribe({
        next: (res) => {
          this.sw.sweet_notificacion("El registro se guardo correctamente", 3000)
          this.dialog.closeAll();
        },
        error: (err) => {
          this.sw.sweet_Error(err);
          console.error('Error al cargar clientes', err);
        }
      });
    }
  

}
