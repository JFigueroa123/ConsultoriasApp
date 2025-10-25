import { Component, OnInit, viewChild } from '@angular/core';
import { OpcionesMenuN1I, UsuarioOpcionesMenuN1I } from '../../data/models/usuarioOpcionesMenuN1';
import { BehaviorSubject } from 'rxjs';
import { ConfigService } from '../../data/services/config.service';
import { MatAccordion } from '@angular/material/expansion';
import { OpcionMenuN1, RolOpcionesMenu } from '../../data/models/usuario.interface';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  showFiller = false;
  accordion = viewChild.required(MatAccordion);
  public OpcionesMenu = new BehaviorSubject<OpcionMenuN1[]>([]);

  constructor(private configService: ConfigService){  
  }


  ngOnInit(): void {
    this.cargarOpcionesMenu();
  }

  cargarOpcionesMenu(){
    // Suscribirse para actualizar automáticamente
    this.configService.UsuarioOpcionesMenu.subscribe(menu => {
      this.OpcionesMenu.next(menu.map(e => e.opcionMenuN1));
      console.log(this.OpcionesMenu.getValue())
      this.ordenarOpcionesMenu();
    });
  }

  //Método separado para ordenar
  ordenarOpcionesMenu(){
    const valorActual = this.OpcionesMenu.getValue();
    const menuOrdenado = valorActual.sort((a, b) => a.numeroOrden - b.numeroOrden);
    this.OpcionesMenu.next(menuOrdenado);
  }
 

}
