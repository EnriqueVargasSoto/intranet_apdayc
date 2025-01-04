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



export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

export type ChartOptionsBars3 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
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
  };

  // Configuración para el gráfico de barras (Users)
  usersChartOptions: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    plotOptions: ApexPlotOptions;
    colors: string[];
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
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
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yaxis: {
        show: false
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
      ]
    };

    this.chartOptionsBars3 = {
      series: [
        {
          name: "Net Profit",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        },
        {
          name: "Revenue",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        },
        {
          name: "Free Cash Flow",
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          //endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct"
        ]
      },
      yaxis: {
        title: {
          text: "$ (thousands)"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return "$ " + val + " thousands";
          }
        }
      }
    };
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.listarReportes();
  }

  listarReportes(accion?: string){
    this.loading = true
    let url = 'reports';
    console.log(accion);
    if (accion != undefined) {
      url = url+'?lastEvaluatedKey[DOCUMENT_ID][S]='+accion;
    }
    console.log(this.search);
    if (this.search != '') {
      url = url+'?searchTerm='+this.search;
    }

    console.log('url', url)
    this.apiService.consulta(url,'get').then((resp) => {
      console.log(resp);
      this.reportes = resp['data']['items'];
      this.boolPrevius = resp['data']['hasPreviousPage'];
      this.boolNext = resp['data']['hasNextPage'];
      if(resp['data']['nextEvaluatedKey'] != null){
        this.nextKey = resp['data']['nextEvaluatedKey']['DOCUMENT_ID']['S']
      }
      if(resp['data']['previousEvaluatedKey'] != null){
        this.nextKey = resp['data']['previousEvaluatedKey']['DOCUMENT_ID']['S']
      }
    });
    this.loading = false;
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
}
