import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monitoreo',
  templateUrl: './monitoreo.component.html',
  styleUrls: ['./monitoreo.component.scss']
})
export class MonitoreoComponent implements OnInit{

  zonas: any[] = [
    {
      id: 1,
      zona: 'Todas'
    },
    {
      id: 2,
      zona: '2000-Miraflores'
    }
  ];

  rutas: any[] = [
    {
      id: 1,
      ruta: 'Todas'
    },
    {
      id: 2,
      ruta: '1--'
    },
    {
      id: 3,
      ruta: '2001--'
    },
    {
      id: 4,
      ruta: '2002--'
    },
    {
      id: 5,
      ruta: '2003--'
    },
    {
      id: 6,
      ruta: '2004--'
    },
    {
      id: 7,
      ruta: '2005--'
    },
    {
      id: 8,
      ruta: '2006--'
    },
    {
      id: 9,
      ruta: '2007--'
    }
  ];

  ventas: any[] = [
    {
        "vendedorx": "62348",
        "nombrex": "ALDAZ CASTRO HERBERT MANUEL",
        "telefonox": "",
        "zona": "2000",
        "ruta": "2003",
        "clientes": "570",
        "efectivos": "0",
        "noCompra": "0",
        "estadoVendedor": "PENDIENTE",
        "cantidadVenta": "0",
        "importeVentasx": ".00",
        "totalPesox": ".00",
        "numeroGuiax": "preventa"
    },
    {
        "vendedorx": "62339",
        "nombrex": "CHAMBERGO ZAVALETA ROBERTO",
        "telefonox": "",
        "zona": "2000",
        "ruta": "2002",
        "clientes": "905",
        "efectivos": "0",
        "noCompra": "0",
        "estadoVendedor": "PENDIENTE",
        "cantidadVenta": "0",
        "importeVentasx": ".00",
        "totalPesox": ".00",
        "numeroGuiax": "preventa"
    },
    {
        "vendedorx": "62400",
        "nombrex": "CONTRERAS ARAPA SALOMON",
        "telefonox": "",
        "zona": "2000",
        "ruta": "2037",
        "clientes": "797",
        "efectivos": "0",
        "noCompra": "0",
        "estadoVendedor": "PENDIENTE",
        "cantidadVenta": "0",
        "importeVentasx": ".00",
        "totalPesox": ".00",
        "numeroGuiax": "preventa"
    },
    {
        "vendedorx": "62342",
        "nombrex": "DELGADO  VICTOR",
        "telefonox": "",
        "zona": "2000",
        "ruta": "2005",
        "clientes": "1845",
        "efectivos": "0",
        "noCompra": "0",
        "estadoVendedor": "PENDIENTE",
        "cantidadVenta": "0",
        "importeVentasx": ".00",
        "totalPesox": ".00",
        "numeroGuiax": "preventa"
    },
    {
        "vendedorx": "62341",
        "nombrex": "FERREYRA SANCHEZ CHRISTIAN ALFREDO",
        "telefonox": "",
        "zona": "2000",
        "ruta": "2004",
        "clientes": "554",
        "efectivos": "0",
        "noCompra": "0",
        "estadoVendedor": "PENDIENTE",
        "cantidadVenta": "0",
        "importeVentasx": ".00",
        "totalPesox": ".00",
        "numeroGuiax": "preventa"
    },
    /* {
        "vendedorx": "62347",
        "nombrex": "GESTOS OFICINA, AGECOFER",
        "telefonox": "",
        "zona": "2000",
        "ruta": "1",
        "clientes": "1784",
        "efectivos": "0",
        "noCompra": "0",
        "estadoVendedor": "PENDIENTE",
        "cantidadVenta": "0",
        "importeVentasx": ".00",
        "totalPesox": ".00",
        "numeroGuiax": "preventa"
    },
    {
        "vendedorx": "62343",
        "nombrex": "HERNANDEZ ROJAS MIGUEL ANGEL",
        "telefonox": "",
        "zona": "2000",
        "ruta": "2001",
        "clientes": "1150",
        "efectivos": "0",
        "noCompra": "0",
        "estadoVendedor": "PENDIENTE",
        "cantidadVenta": "0",
        "importeVentasx": ".00",
        "totalPesox": ".00",
        "numeroGuiax": "preventa"
    },
    {
        "vendedorx": "62340",
        "nombrex": "SOTO CABRERA LUIS",
        "telefonox": "",
        "zona": "2000",
        "ruta": "2006",
        "clientes": "2612",
        "efectivos": "0",
        "noCompra": "0",
        "estadoVendedor": "PENDIENTE",
        "cantidadVenta": "0",
        "importeVentasx": ".00",
        "totalPesox": ".00",
        "numeroGuiax": "preventa"
    } */
  ];

  fechaString: string = '';

  constructor(private datePipe: DatePipe, private router: Router){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const fecha = new Date();
    this.fechaString = this.datePipe.transform(fecha, 'dd/MM/yyyy') || '';
  }

  maps(){
    return this.router.navigate(['/monitoreo/maps']);
  }
}
