import { Component, inject, ViewChild } from '@angular/core';
import { SweetAlerService } from '../../data/services/sweetAler.service';
import { AsignacionService } from '../../data/services/asignacion.service';
import { MatDialog } from '@angular/material/dialog';
import { VisitasClientesI } from '../../data/models/visitasClientes.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AsginarClientesComponent } from '../asignacion/asginar-clientes/asginar-clientes.component';
import { VisitasByUsuario } from '../../data/services/visitasByUsuario.service';
import { VisitaComponent } from './visita/visita.component';

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.component.html',
  styleUrl: './visitas.component.scss'
})
export class VisitasComponent {

  readonly dialog = inject(MatDialog);
    
  
    listado: VisitasClientesI[] = [];
    displayedColumns: string[] = ['menu', 'nombres', 'apellidos', 'email', 'telefono', 'tecnico', 'fecha', 'fechaHoraLlegada', 'fechaHoraSalida', 'estado'];
    dataSource = new MatTableDataSource<VisitasClientesI>(this.listado);
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    constructor(private service: VisitasByUsuario,  private sw: SweetAlerService) {}
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  
    cargarPaginaFiltros() {
      this.sw.sweet_carga("Consultando datos. Espere.....");  
      this.service.getMisVisitas().subscribe({
        next: (res) => {
          this.listado = res;
          this.dataSource = new MatTableDataSource<VisitasClientesI>(this.listado); // ✅ correcto
          this.dataSource.paginator = this.paginator; // ✅ reconfigurar paginador
          this.sw.sweet_notificacion("Datos cargados correctamente", 3000);
        },
        error: (err) => {
          console.error('Error al cargar clientes', err);
        }
      });
    }
  
    
     updateCliente(data: VisitasClientesI) {    
      const dialogRef = this.dialog.open(VisitaComponent,{
        disableClose: true, 
        data: data, 
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

}
