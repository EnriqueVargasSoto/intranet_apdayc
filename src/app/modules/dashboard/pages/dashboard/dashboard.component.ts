import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api-service/api.service';

import {
  ApexChart,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,


  ApexPlotOptions,

  ChartComponent,

  ApexNonAxisChartSeries,
  ApexResponsive,

  ApexLegend,
} from 'ng-apexcharts';
import { TabItem, Tabs, TabsInterface } from 'flowbite';



export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend?: ApexLegend; // Añadido para manejar la leyenda
};

export type ChartOptionsBars3 = {
  series: any[];
  chart: any;
  xaxis: any;
  dataLabels: any;
  tooltip: any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  cabeceras: string[] = ['RUC Cliente', ]
  reportes: any[] = [];

  boolPrevius: boolean = false;
  previusKey : string = '';
  boolNext: boolean = false;
  nextKey: string = '';

  search: string = '';

  loading: boolean = false;

  totalDocumentosProcesados = 0;

  topsConceptos: any[] = [];

  topsClientes: any[] = [];

  documentosMasEmitidosList: any[] = [];
  totalDocumentos = 0;
  leyendaGraficoCirculo: any[] = [];
  seriesDonus: any[]=[];
  labelsDonus: string[] = [];

  public chartSeries: ApexAxisChartSeries = [
    {
      name: 'Revenue',
      data: [6400, 6200, 6300, 6600, 6400, 6200, 6000], // Datos del período actual
    },
    {
      name: 'Revenue (previous period)',
      data: [6500, 6700, 6400, 6100, 6600, 6800, 6200], // Datos del período anterior
    },
  ];

  public chartOptions: any = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    colors: ['#1E90FF', '#FFA07A'], // Azul para actual, salmón para anterior
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    markers: {
      size: 4,
    },
    grid: {
      borderColor: '#444',
    },
    xaxis: {
      categories: ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb'], // Fechas
      labels: {
        style: {
          colors: '#CCCCCC',
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value: number) => `$${value.toFixed(0)}`, // Formato de dólar
        style: {
          colors: '#CCCCCC',
        },
      },
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (value: number) => `$${value.toFixed(2)}`,
      },
    },
    legend: {
      position: 'top',
      labels: {
        colors: '#FFFFFF',
      },
    },
  };

  barChartOptions: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    plotOptions: ApexPlotOptions;
    colors: string[];
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    tooltip?: ApexTooltip;
  };

  // Configuración para el gráfico de barras (Users)
  usersChartOptions: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    plotOptions: ApexPlotOptions;
    colors: string[];
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    tooltip?: ApexTooltip;
  };

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptionsDonus: Partial<ChartOptions>;

  @ViewChild("chart") chartBars3!: ChartComponent;
  public chartOptionsBars3: Partial<ChartOptionsBars3>;

  constructor(private apiService: ApiService, private http: HttpClient){
    // Configuración del gráfico de barras
    this.barChartOptions = {
      series: [
        {
          name: "Products",
          data: [10, 15, 14, 20, 18, 25, 30]
        }
      ],
      chart: {
        type: "bar",
        height: 100,
        sparkline: { enabled: true }
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
          borderRadius: 5
        }
      },
      colors: ["#1E3A8A"], // Azul
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yaxis: {
        show: false
      },
      tooltip: {
        enabled: false // Deshabilitar el tooltip
      }
    };

     // Configuración del gráfico de barras (Users)
     this.usersChartOptions = {
      series: [
        {
          name: "Users",
          data: [5, 10, 15, 12, 18, 16, 14]
        }
      ],
      chart: {
        type: "bar",
        height: 100,
        sparkline: { enabled: true }
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
          borderRadius: 5
        }
      },
      colors: ["#3B82F6"], // Azul diferente
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yaxis: {
        show: false
      },
      tooltip: {
        enabled: false // Deshabilitar el tooltip
      }
    };

    this.chartOptionsDonus = {
      series: [44, 55, 13, 43, 22],
      chart: {
        type: "donut"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      legend: {
        show: false  // Esto desactiva la visualización de las series al lado del gráfico
      }
    };

    this.chartOptionsBars3 = {
      series: [
        {
          name: 'Desktop PC',
          data: [170, 150, 140, 200, 180]
        },
        {
          name: 'Phones',
          data: [120, 100, 130, 180, 150]
        },
        {
          name: 'Gaming/Console',
          data: [220, 180, 210, 230, 200]
        }
      ],
      chart: {
        type: 'bar',
        height: 350
      },
      xaxis: {
        categories: ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb'],
        grid:{
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      tooltip: {
        shared: true,
        intersect: false
      },

    };
  }

  async ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //this.loading = true
   this.inicializaTabs();
   this.listarReportes(1);
   this.cantidadDocumentosProcesados();
   this.documentosMasEmitidos();
   this.totalTiposDocumentos();
   this.leyendaParaGraficoCirculo();
   this.llenarGraficoDona();
    //this.loading = false;
  }

  async listarReportes(page?: number){

    let url = 'athena/data?page='+page+'&limit=5';

    await this.apiService.consulta(url,'get').subscribe((resp) => {
      console.log(resp);
      this.reportes = resp['data'];
      //this.paginacion = resp['pagination'];



    });

  }

  verDocumento(documentoId: string){
    let body = {
      key: documentoId
    }
    /* this.http.post('http://127.0.0.1:9000/api/document', body).subscribe((response: any) => {
      // Verifica si la respuesta es un URL
      const imageUrl = response; // Asegúrate de que tu API devuelva la URL de la imagen
      console.log('la image: ',imageUrl);
      if (imageUrl) {
        window.open(imageUrl, '_blank');
      }
    }); */
    this.http
    .post('https://apdayc-doc-query.atiendo.pe/api/document', body, { responseType: 'blob' }).subscribe((response: Blob) => {
      const blob = new Blob([response], { type: 'image/png' });
      const imageUrl = window.URL.createObjectURL(blob);
      window.open(imageUrl, '_blank');
    });
  }

  cantidadDocumentosProcesados(){

    const query = {
      query : "SELECT COUNT(*) AS total_documents FROM documents",
    };

    this.apiService.consulta('consulta-athena','post',query).subscribe((resp: any) => {
      console.log('total: ',resp[0][0]);
      this.totalDocumentosProcesados = resp[0][0];
    });
  }

  inicializaTabs(){
    const tabsElement: HTMLElement = document.getElementById('fullWidthTabContent')!;

    // create an array of objects with the id, trigger element (eg. button), and the content element
    const tabElements: TabItem[] = [
      {
          id: 'faq',
          triggerEl: document.querySelector('#faq-tab')!,
          targetEl: document.querySelector('#faq')!,
      },
      {
          id: 'about',
          triggerEl: document.querySelector('#about-tab')!,
          targetEl: document.querySelector('#about')!,
      },
    ];

    const tabs: TabsInterface = new Tabs(tabsElement, tabElements);

    tabs.show('about');

    const query = {
      query : "SELECT item_code, item_description, COUNT(item_code) AS item_count FROM documents WHERE status='SUCCESS' GROUP BY item_code, item_description ORDER BY item_count DESC LIMIT 5;",
    };

    this.apiService.consulta('consulta-athena','post',query).subscribe((resp: any) => {
      console.log('total: ',resp);
      this.topsConceptos = resp;
    });

    const query1 = {
      query : "SELECT client_ruc, client_name, COUNT(*) AS numero_facturas FROM documents WHERE status='SUCCESS' GROUP BY client_ruc, client_name ORDER BY numero_facturas DESC LIMIT 5;",
    };

    this.apiService.consulta('consulta-athena','post',query1).subscribe((resp: any) => {
      console.log('total: ',resp);
      this.topsClientes = resp;
    });
  }

  documentosMasEmitidos(){
    const query = {
      query : "SELECT document_type, COUNT(*) AS cantidad FROM documents WHERE status='SUCCESS' GROUP BY document_type ORDER BY cantidad DESC LIMIT 4;",
    };

    this.apiService.consulta('consulta-athena','post',query).subscribe((resp: any) => {
      console.log('total: ',resp);
      this.documentosMasEmitidosList = resp;
    });
  }

  totalTiposDocumentos(){
    const query = {
      query : "SELECT COUNT(DISTINCT document_type) AS total_tipos_documentos FROM documents WHERE status='SUCCESS';",
    };

    this.apiService.consulta('consulta-athena','post',query).subscribe((resp: any) => {
      console.log('total: ',resp[0][0]);
      this.totalDocumentos = resp[0][0];
    });
  }

  leyendaParaGraficoCirculo(){
    const query = {
      query : "SELECT document_type, COUNT(*) AS cantidad FROM documents WHERE status='SUCCESS' GROUP BY document_type ORDER BY cantidad DESC LIMIT 3;",
    };

    this.apiService.consulta('consulta-athena','post',query).subscribe((resp: any) => {
      console.log('total: ',resp);
      this.leyendaGraficoCirculo = resp;
    });
  }

  llenarGraficoDona(){
    const query = {
      query : "SELECT document_type, COUNT(*) AS cantidad FROM documents WHERE status='SUCCESS' GROUP BY document_type ORDER BY cantidad DESC;",
    };

    this.apiService.consulta('consulta-athena','post',query).subscribe((resp: any[]) => {
      console.log('total: ',resp);
      resp.forEach(element => {
        this.labelsDonus.push(element[0]);
        this.seriesDonus.push(parseInt(element[1]));
      });

      this.chartOptionsDonus.labels = this.labelsDonus;
      this.chartOptionsDonus.series = this.seriesDonus;
    });
  }
}
