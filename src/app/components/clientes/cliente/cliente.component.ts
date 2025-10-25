import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../../../data/services/clientes.service';
import { SweetAlerService } from '../../../data/services/sweetAler.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { GoogleMapsLoaderService } from '../../../data/services/googleMaps.service';
import { ClientesI } from '../../../data/models/clientes.interface';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss'
})
export class ClienteComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  form!: UntypedFormGroup;
  center = { lat: 14.634915, lng: -90.506882 }; // Guatemala City
  zoom = 12;
  mapaListo = false; // <- importante

  //update
  clienteData: ClientesI;

  title: string='';
  
  constructor(private service: ClientesService, private fb: FormBuilder, private sw: SweetAlerService, private googleMapsLoader: GoogleMapsLoaderService,  @Inject(MAT_DIALOG_DATA) public data: ClientesI){
    this.clienteData = this.data;
  }


  async ngOnInit(): Promise<void> {
    this.cargarComponente();
    await this.googleMapsLoader.load();
    console.log('Google Maps API cargada correctamente ✅');
  }

  configurarForm(){

    const currentDate = new Date().toISOString();
    this.form = this.fb.group({
      id:            [{value: 0, disabled: false}],
      nombres:       [{value: null, disabled: false}, Validators.required],
      apellidos:     [{value: null, disabled: false}, Validators.required],
      telefono:      [{value: null, disabled: false}, Validators.required],
      email:         [{value: null, disabled: false}, Validators.required],
      numeroDoc:     [{value: null, disabled: false}, Validators.required],
      direccion:     [{value: null, disabled: false}, Validators.required],
      activo:        [{value: true, disabled: false}, Validators.required],
      fechaCreacion: [{value: currentDate, disabled: false}, Validators.required],
    });
    
  }

  cargarComponente(){
    if(this.isNuevo()){
      this.configurarForm();
    }else{
      //si no es nuevo, entonces configura el formulario y le setea el object dataCliente
      this.configurarForm();
      this.form.patchValue(this.clienteData)
    }
  } 

  isNuevo():boolean{
   return this.clienteData===null? true: false
  }


  guardarRegistro(){
    if(this.form.invalid){
      this.sw.sweet_alerta("Campos Requeridos", "Complete los campos requeridos", "warning");
      this.form.markAllAsTouched();
      return;
    }
    
    this.sw.sweet_carga("Guardando registro. Espere.....");
    this.service.postClientes(this.form.value).subscribe({
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


  actualizarRegistro(){
    if(this.form.invalid){
      this.sw.sweet_alerta("Campos Requeridos", "Complete los campos requeridos", "warning");
      this.form.markAllAsTouched();
      return;
    }
    
    this.sw.sweet_carga("Guardando registro. Espere.....");
    this.service.updateCliente(this.form.value).subscribe({
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


  cargarRegistro(data: ClientesI){
    console.log(data)
  }
  


}
