import { Component } from '@angular/core';
import { Dismiss, Modal } from 'flowbite';
import { ApiService } from 'src/app/services/api-service/api.service';

@Component({
  selector: 'app-sincronizar',
  templateUrl: './sincronizar.component.html',
  styleUrls: ['./sincronizar.component.scss']
})
export class SincronizarComponent {

  loading:boolean = false

  constructor(private apiService: ApiService){}

  sincronizar(columna: string) {
    this.loading = true;
    this.openAlert();
    this.apiService.consulta('guarda-nombre-clientes/'+columna,'get').subscribe((resp) => {
      console.log('respuesta:',resp);
      this.loading = false;
    });

  }

  openAlert(){
    // set the modal menu element
    const $targetEl = document.getElementById('info-popup');

    // options with default values
    // const options:any = {
    //     placement: 'bottom-right',
    //     backdrop: 'dynamic',
    //     backdropClasses:
    //         'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
    //     closable: true,
    //     onHide: () => {
    //         console.log('modal is hidden');
    //     },
    //     onShow: () => {
    //         console.log('modal is shown');
    //     },
    //     onToggle: () => {
    //         console.log('modal has been toggled');
    //     },
    // };

    // instance options object
    // const instanceOptions = {
    //   id: 'modalEl',
    //   override: true
    // };

    const modal = new Modal($targetEl);

    // show the modal
    modal.show();
  }

  closeAlert(){
    // set the modal menu element
    const $targetEl = document.getElementById('info-popup');

    // options with default values
    // const options:any = {
    //     placement: 'bottom-right',
    //     backdrop: 'dynamic',
    //     backdropClasses:
    //         'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
    //     closable: true,
    //     onHide: () => {
    //         console.log('modal is hidden');
    //     },
    //     onShow: () => {
    //         console.log('modal is shown');
    //     },
    //     onToggle: () => {
    //         console.log('modal has been toggled');
    //     },
    // };

    // instance options object
    // const instanceOptions = {
    //   id: 'modalEl',
    //   override: true
    // };

    const modal = new Modal($targetEl);

    // show the modal
    modal.hide();
  }
}
