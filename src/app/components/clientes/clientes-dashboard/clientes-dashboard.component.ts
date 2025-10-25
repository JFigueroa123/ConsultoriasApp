import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ClientesService } from '../../../data/services/clientes.service';
import { SweetAlerService } from '../../../data/services/sweetAler.service';
import moment from 'moment';
import { QueryFilter } from '../../../shared/tabla/models/configTabla.interface';

@Component({
  selector: 'app-clientes-dashboard',
  templateUrl: './clientes-dashboard.component.html',
  styleUrl: './clientes-dashboard.component.scss'
})
export class ClientesDashboardComponent {
  fechaInicio: string | null = null;
  fechaFin: string | null = null;  
  filters: QueryFilter[] = [];;
  

  constructor(private service: ClientesService,  private sw: SweetAlerService) {}

 option: EChartsOption = {
    xAxis: {
      type: 'category', // ✅ Literal, no string genérico
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value' // ✅ Literal
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line', // ✅ Literal
        smooth: true
      }
    ]
  };


   cargarPaginaFiltros() {

      let fichaInicio = this.fechaInicio ? moment(this.fechaInicio).format('YYYY-MM-DD') : null;
      let fichaFin = this.fechaFin ? moment(this.fechaFin).format('YYYY-MM-DD') : null;

      this.filters.push({filtro: "fechaInicio", parametro: fichaInicio});
      this.filters.push({filtro: "fechaFin", parametro: fichaFin});

      console.log(this.filters);
    
      this.sw.sweet_carga("Consultando datos. Espere.....");
  
      this.service.getClientes().subscribe({
        next: (res) => {
          this.sw.sweet_notificacion("Datos cargados correctamente", 3000);
        },
        error: (err) => {
          console.error('Error al cargar clientes', err);
        }
      });
    }
  

}
