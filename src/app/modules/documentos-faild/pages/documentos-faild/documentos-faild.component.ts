import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Drawer } from 'flowbite';
import { ApiService } from 'src/app/services/api-service/api.service';
import { IndexDbService } from 'src/app/services/index-db/index-db.service';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

interface Conversation {
  name: string;
  messages: Message[];
}

@Component({
  selector: 'app-documentos-faild',
  templateUrl: './documentos-faild.component.html',
  styleUrls: ['./documentos-faild.component.scss']
})
export class DocumentosFaildComponent {

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

  queryNumber: string = '';
  filteredOptionsNumber: any[] = [];

  filtro: string = '';

  conversations: Conversation[] = [
    { name: 'Conversación 1', messages: [{ sender: 'bot', text: 'Hola, ¿cómo puedo ayudarte?' }] },
    { name: 'Conversación', messages: [{ sender: 'bot', text: '¿Tienes alguna consulta?' }] },
  ];
  selectedConversation: Conversation | null = null;

  messageText: string = '';

  URL_CHAT: string = 'https://ieyy73j919.execute-api.us-east-2.amazonaws.com/chatbot-api';

  showToast = false;

  documento: any = {};

  constructor(private apiService: ApiService, private http: HttpClient, private indexDbService: IndexDbService){
    this.selectConversation({ name: 'Conversación', messages: [{ sender: 'bot', text: '¿Tienes alguna consulta?' }] })
  }

  async ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    await this.listarReportes(this.page);

  }

  async listarReportes(page?: number){
    this.loading = true
    let url = 'athena/data?page='+page+'&limit='+this.limit+'&status=FAILED';
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

    if (this.filtro == 'document_number') {
      query = this.queryNumber
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
        const data ={
          column_json: "client_ruc",
          searchString: this.query
        }

        this.apiService.consulta('json-client-search', 'post', data).subscribe((resp) => {
          this.filteredOptions = resp;
        });
        /* this.filteredOptions = await this.indexDbService.searchRecords(this.query, 'client_ruc'); */

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

        const data ={
          column_json: "client_name",
          searchString: this.queryName
        }

        this.apiService.consulta('json-client-search', 'post', data).subscribe((resp) => {
          this.filteredOptionsName = resp;
        });

        /* this.filteredOptionsName = await this.indexDbService.searchRecords(this.queryName, 'client_name'); */
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
        const data ={
          column_json: "document_location",
          searchString: this.queryLocation
        }

        this.apiService.consulta('json-client-search', 'post', data).subscribe((resp) => {
          this.filteredOptionsLocation = resp;
        });
        /* this.filteredOptionsLocation = await this.indexDbService.searchRecords(this.queryLocation, 'document_location'); */
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

  async filterOptionsNumber() {

    if (this.queryNumber.length > 2) {  // Asegúrate de tener al menos 3 caracteres antes de hacer la búsqueda

      try {
        const data ={
          column_json: "document_number",
          searchString: this.queryNumber
        }

        this.apiService.consulta('json-client-search', 'post', data).subscribe((resp) => {
          this.filteredOptionsNumber = resp;
        });
        /* this.filteredOptionsLocation = await this.indexDbService.searchRecords(this.queryLocation, 'document_location'); */
        console.log(this.filteredOptionsNumber.length)

      } catch (error) {
        console.error('Error al cargar los datos: ', error);
      }
    }
  }

  selectOptionNumber(option: any) {
    this.queryNumber = option.document_number;
    this.filteredOptionsNumber = [];
    this.filtro = 'document_number';
    this.listarReportes(1);
  }

  // Esta función se ejecuta cuando el input pierde el foco
  onBlur() {
    setTimeout(() => {
      this.filteredOptionsName = []; // Oculta las opciones al perder el foco
    }, 200); // Retraso para que el click en el <li> se pueda detectar antes de ocultar
  }

  openDrawer(documento: any){
    const $targetEl = document.getElementById('drawer-update-product-default');

    // options with default values
    const options = {
      placement: 'right',
      backdrop: true,
      bodyScrolling: false,
      edge: false,
      edgeOffset: '',
      backdropClasses:
          'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30',
      onHide: () => {
          console.log('drawer is hidden');
      },
      onShow: () => {
          console.log('drawer is shown');
      },
      onToggle: () => {
          console.log('drawer has been toggled');
      },
    };

    // instance options object
    const instanceOptions = {
      id: 'drawer-js-example',
      override: true
    };

    const drawer = new Drawer($targetEl, options, instanceOptions);
    this.documento = documento;
    // show the drawer
    drawer.show();

  }

  closeDrawer(){
    const $targetEl = document.getElementById('drawer-update-product-default');

    // options with default values
    const options = {
      placement: 'right',
      backdrop: true,
      bodyScrolling: false,
      edge: false,
      edgeOffset: '',
      backdropClasses:
          'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30',
      onHide: () => {
          console.log('drawer is hidden');
      },
      onShow: () => {
          console.log('drawer is shown');
      },
      onToggle: () => {
          console.log('drawer has been toggled');
      },
    };

    // instance options object
    const instanceOptions = {
      id: 'drawer-js-example',
      override: true
    };

    const drawer = new Drawer($targetEl, options, instanceOptions);

    this.documento = {};
    // show the drawer
    drawer.hide();

  }

  selectConversation(conversation: Conversation) {
    this.selectedConversation = conversation;
  }

  sendMessage() {
    if (!this.messageText.trim() || !this.selectedConversation) return;

    this.selectedConversation.messages.push({ sender: 'user', text: this.messageText });
    const body = {
      prompt: this.messageText
    };

    this.messageText = '';

    this.http.post(this.URL_CHAT, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${token}`
      })}).subscribe((resp: any) => {
      this.selectedConversation?.messages.push({
        sender: 'bot',
        text: resp.response//'Gracias por tu mensaje. Estoy aquí para ayudarte.',
      });
    });



    // Simulate bot response
    /* setTimeout(() => {
      this.selectedConversation?.messages.push({
        sender: 'bot',
        text: 'Gracias por tu mensaje. Estoy aquí para ayudarte.',
      });
    }, 1000); */
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(
      () => {
        //alert('Texto copiado al portapapeles: ' + text); // Opcional: Notificación
        this.showToast = true;
        setTimeout(() => (this.showToast = false), 3000);
      },
      (err) => {
        console.error('Error al copiar texto: ', err);
      }
    );
  }

  extractLote(input: string): string {
    const parts = input.split('/');
    return parts.find(part => part.startsWith('LOTE')) || ''; // Devuelve el lote o una cadena vacía
  }
}
