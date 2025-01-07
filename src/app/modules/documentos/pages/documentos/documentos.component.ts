import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api-service/api.service';
import { IndexDbService } from 'src/app/services/index-db/index-db.service';

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

  loading: boolean = true;


  query: string = '';
  filteredOptions: any[] = [];

  queryName: string = '';
  filteredOptionsName: any[] = [];

  queryLocation: string = '';
  filteredOptionsLocation: any[] = [];

  filtro: string = '';

  constructor(private apiService: ApiService, private http: HttpClient, private indexDbService: IndexDbService){}

  async ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    await this.listarReportes(this.page);

  }

  async listarReportes(page?: number){
    this.loading = true
    let url = 'athena/data?page='+page+'&limit='+this.limit;
    let query = '';
    if (this.filtro == 'client_ruc') {
      query = this.query
    }

    if (this.filtro == 'client_name') {
      query = this.queryName
    }

    if (this.filtro == 'document_location') {
      query = this.queryLocation
    }

    if(this.filtro !== '' && query !== ''){
      url = url+'&filter_column='+this.filtro+'&filter_value='+query;
    }

    await this.apiService.consulta(url,'get').subscribe((resp) => {
      console.log(resp);
      this.reportes = resp['data'];
      this.paginacion = resp['pagination'];

      this.loading = false;

    });

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

  async filterOptions() {
    if (this.query.length > 2) {  // Asegúrate de tener al menos 3 caracteres antes de hacer la búsqueda

      try {
        this.filteredOptions = await this.indexDbService.searchRecords(this.query, 'client_ruc');

      } catch (error) {
        console.error('Error al cargar los datos: ', error);
      }
    }
  }

  selectOption(option: any) {
    this.query = option.client_ruc;
    this.filteredOptions = [];
    this.filtro = 'client_ruc';
    this.listarReportes(1);
  }

  async filterOptionsName() {

    if (this.queryName.length > 2) {  // Asegúrate de tener al menos 3 caracteres antes de hacer la búsqueda

      try {
        this.filteredOptionsName = await this.indexDbService.searchRecords(this.queryName, 'client_name');
        console.log(this.filteredOptionsName.length)

      } catch (error) {
        console.error('Error al cargar los datos: ', error);
      }
    }
  }

  selectOptionName(option: any) {
    this.queryName = option.client_name;
    this.filteredOptionsName = [];
    this.filtro = 'client_name';
    this.listarReportes(1);
  }

  async filterOptionsLocation() {

    if (this.queryLocation.length > 2) {  // Asegúrate de tener al menos 3 caracteres antes de hacer la búsqueda

      try {
        this.filteredOptionsLocation = await this.indexDbService.searchRecords(this.queryLocation, 'document_location');
        console.log(this.filteredOptionsLocation.length)

      } catch (error) {
        console.error('Error al cargar los datos: ', error);
      }
    }
  }

  selectOptionLocation(option: any) {
    this.queryLocation = option.document_location;
    this.filteredOptionsLocation = [];
    this.filtro = 'document_location';
    this.listarReportes(1);
  }

}
