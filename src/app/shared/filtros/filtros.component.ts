import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.scss'
})
export class FiltrosComponent {
  @Output() clickConsultarDatos = new EventEmitter();


  aplicarFiltro(){
     this.clickConsultarDatos.emit();
  }


}
