import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';
import { AsignacionService } from '../../../data/services/asignacion.service';
import { SweetAlerService } from '../../../data/services/sweetAler.service';
import { VisitasClientesI } from '../../../data/models/visitasClientes.interface';

@Component({
  selector: 'app-asignaciones-dashboard',
  templateUrl: './asignaciones-dashboard.component.html',
  styleUrl: './asignaciones-dashboard.component.scss'
})
export class AsignacionesDashboardComponent {

   listaDatos: VisitasClientesI[]=[];

   cargandoGrafica: boolean= false;

   constructor(private service: AsignacionService,  private sw: SweetAlerService) {}

   option  = {
     title: {
      text: 'Estados', 
      subtext: 'Reporte de clientes por estado',
    },
    xAxis: {
      type: 'category' as const, 
      data: []
    },
    yAxis: {
      type: 'value' as const 
    },
    series: [
      {
        data: [],
        type: 'line' as const, 
        smooth: true,
        lineStyle: {
        width: 4,          // 🔹 grosor de la línea
      }
      }
    ]
  };
    
  option2: EChartsOption = {
    title: {
      text: 'Reporte Técnicos'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {},
    xAxis: {
      type: 'value' // correcto
      // quitar boundaryGap porque no aplica para value
    },
    yAxis: {
      type: 'category',
      data: []
    },
    series: [
      // {
      //   name: '2011',
      //   type: 'bar',
      //   data: [18203, 23489, 29034, 104970, 131744, 630230]
      // },
      // {
      //   name: '2012',
      //   type: 'bar',
      //   data: [19325, 23438, 31000, 121594, 134141, 681807]
      // }
    ]
  };



  


   cargarPaginaFiltros() {
      this.cargandoGrafica =false;
      this.sw.sweet_carga("Consultando datos. Espere.....");
  
      this.service.getVisitasClientes().subscribe({
        next: (res) => {
          this.listaDatos = res;

          this.cargarGraficas(this.listaDatos);
          this.cargarGraficaV2(this.listaDatos);
          this.sw.sweet_notificacion("Datos cargados correctamente", 3000);
        },
        error: (err) => {
          console.error('Error al cargar clientes', err);
        }
      });
    }

   cargarGraficas(datos: VisitasClientesI[]) {
      this.cargandoGrafica = true;
      const labelsEstados = [...new Set(datos.map(v => v.estado.nombre))];      

      labelsEstados.sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));    

      if (Array.isArray(this.option.xAxis)) {
        this.option.xAxis[0].data = labelsEstados;
      } else {
        this.option.xAxis.data = labelsEstados;
      }

      const valores = labelsEstados.map(e =>
        datos.filter(item => item.estado.nombre === e).length
      );

      if (Array.isArray(this.option.series)) {
        this.option.series[0].data = valores;
      } else {
        this.option.series = [
          {
            type: 'line',
            smooth: true,
             lineStyle: {
              width: 4,          // 🔹 grosor de la línea
            },
            data: valores
          }
        ];
      }

      this.cargandoGrafica = true;
    }

    cargarGraficaV2(datos: VisitasClientesI[]){

      const labelsTec = [...new Set(datos.map(v => v.usuario.userName))];
      const labelsEstados = [...new Set(datos.map(v => v.estado.nombre))];  

      labelsTec.sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));
      labelsEstados.sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));   

        // 1️⃣ Llenar yAxis con los nombres de los países
      this.option2.yAxis = {
        type: 'category',
        data: labelsTec,
      };


      const series=[];
      labelsEstados.forEach(itemEs =>{

         const serie ={
          name: itemEs,
          type: 'bar',
          data: []
        }

        labelsTec.forEach(itemTec =>{
          const count = datos.filter(e => e.estado.nombre === itemEs && e.usuario.userName == itemTec).length;
          serie.data.push(count);
        })
       
        series.push(serie);
      })


      this.option2.series = series;   

      this.cargandoGrafica=true;
    }

    
     

}
