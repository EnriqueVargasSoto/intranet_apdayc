import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ApiService } from './services/api-service/api.service';
import { IndexDbService } from './services/index-db/index-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Apdayc';

  constructor(private apiService: ApiService, private indexedDbService: IndexDbService){

  }

  ngOnInit(): void {
    initFlowbite();
    //this.loadItemsFromApi();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }

  async obtenerListadoRuc(){
    await this.apiService.consulta('athena/column?column=client_ruc', 'get').subscribe((resp) => {
      localStorage.setItem('ruc', JSON.stringify(resp.data));
    });
  }

  async loadItemsFromApi() {
    try {
      //this.isLoading = true;
      const items: any = await this.apiService.consulta('athena/column?column=client_ruc', 'get').toPromise();
      await this.indexedDbService.addItems(items.data!, 'client_ruc'); // Guardar en la base local
      //this.isLoading = false;
    } catch (error) {
      console.error('Error al cargar los datos:', error);
      //this.isLoading = false;
    }
  }
}
