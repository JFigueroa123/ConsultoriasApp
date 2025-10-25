import { Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ClientesService } from '../../data/services/clientes.service';
import { ClientesI } from '../../data/models/clientes.interface';
import { SweetAlerService } from '../../data/services/sweetAler.service';
import { MatDialog } from '@angular/material/dialog';
import { ClienteComponent } from './cliente/cliente.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent {
  readonly dialog = inject(MatDialog);

  listadoClientes: ClientesI[] = [];
  displayedColumns: string[] = ['menu', 'nombres', 'apellidos', 'email', 'telefono', 'numeroDoc', 'fecha', 'activo'];
  dataSource = new MatTableDataSource<ClientesI>(this.listadoClientes);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: ClientesService,  private sw: SweetAlerService) {}

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


    this.service.getClientes().subscribe({
      next: (res) => {
        this.listadoClientes = res;
        this.dataSource = new MatTableDataSource<ClientesI>(this.listadoClientes); // ✅ correcto
        this.dataSource.paginator = this.paginator; // ✅ reconfigurar paginador
        this.sw.sweet_notificacion("Datos cargados correctamente", 3000);
      },
      error: (err) => {
        console.error('Error al cargar clientes', err);
      }
    });
  }


  addCliente() {    
    const dialogRef = this.dialog.open(ClienteComponent,{
      disableClose: true, // 👈 Esto evita que se cierre al hacer click fuera o con ESC
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

   updateCliente(cliente: ClientesI) {    
    const dialogRef = this.dialog.open(ClienteComponent,{
      disableClose: true, // 👈 Esto evita que se cierre al hacer click fuera o con ESC
      data: cliente, // 👈 Aquí envías los datos del cliente
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
