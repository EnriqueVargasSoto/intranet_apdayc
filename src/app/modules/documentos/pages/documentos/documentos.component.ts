import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api-service/api.service';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss']
})
export class DocumentosComponent {

  cabeceras: string[] = ['RUC Cliente', ]
  reportes: any[] = [];
  paginacion: any;

  page: number =1;
  limit: number = 10;

  boolPrevius: boolean = false;
  previusKey : string = '';
  boolNext: boolean = false;
  nextKey: string = '';

  search: string = '';

  loading: boolean = false;


  query: string = '';
  options: string[] = [];
  filteredOptions: string[] = [];

  constructor(private apiService: ApiService, private http: HttpClient){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.listarReportes(this.page);
  }

  listarReportes(page?: number, client_ruc?: string){
    this.loading = true
    let url = 'athena/data?page='+page+'&limit='+this.limit;
    // console.log(accion);
    // if (accion != undefined) {
    //   url = url+'?lastEvaluatedKey[DOCUMENT_ID][S]='+accion;
    // }
    // console.log(this.search);
    // if (this.search != '') {
    //   url = url+'?searchTerm='+this.search;
    // }

    if(client_ruc){
      url = url+'&client_ruc='+client_ruc;
    }

    console.log('url', url)
    this.apiService.consulta(url,'get').then((resp) => {
      console.log(resp);
      this.reportes = resp['data'];
      this.paginacion = resp['pagination'];
      // this.boolPrevius = resp['data']['hasPreviousPage'];
      // this.boolNext = resp['data']['hasNextPage'];
      // if(resp['data']['nextEvaluatedKey'] != null){
      //   this.nextKey = resp['data']['nextEvaluatedKey']['DOCUMENT_ID']['S']
      // }
      // if(resp['data']['previousEvaluatedKey'] != null){
      //   this.nextKey = resp['data']['previousEvaluatedKey']['DOCUMENT_ID']['S']
      // }
    });
    this.loading = false;
  }

  verDocumento(documentoId: string){
    let body = {
      key: documentoId
    }
    this.http
    .post('https://apdayc-doc-query.atiendo.pe/api/document', body, { responseType: 'blob' }).subscribe((response: Blob) => {
      const blob = new Blob([response], { type: 'image/png' });
      const imageUrl = window.URL.createObjectURL(blob);
      window.open(imageUrl, '_blank');
    });
  }

  filterOptions() {
    this.filteredOptions = this.options.filter(option =>
      option.toLowerCase().includes(this.query.toLowerCase())
    );
  }

  selectOption(option: string) {
    this.query = option;
    this.filteredOptions = [];
    this.listarReportes(1, option);
  }

  listadoRuc(){
    let url = 'athena/column?column=client_ruc&value='+this.query;

    this.apiService.consulta(url, 'get').then((resp) => {
      this.filteredOptions = resp.data;
    });
  }

}
