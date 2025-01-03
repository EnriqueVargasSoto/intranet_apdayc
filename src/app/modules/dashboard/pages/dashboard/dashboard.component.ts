import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api-service/api.service';

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

  constructor(private apiService: ApiService, private http: HttpClient){}

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
