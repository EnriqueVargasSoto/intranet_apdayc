import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service/api.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { IndexDbService } from 'src/app/services/index-db/index-db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient,private fb: FormBuilder, private apiService: ApiService, private indexedDbService: IndexDbService){
    this.loginForm = this.fb.group({
      vc_usuario: ['', [Validators.required]],
      vc_clave: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.loginForm.get('vc_usuario')?.valueChanges.subscribe((value) => {
      this.loginForm.get('vc_usuario')?.setValue(value.toUpperCase(), { emitEvent: false });
    });
  }

  async login(){
/*     this.http.post(this.base_url+'auth/login', this.loginForm.value).subscribe((resp: any) => {
 */
    this.loading = true

    if (this.loginForm.valid) {
      const data= {
        access_token: 'asd123'
      }
      if (this.loginForm.value.vc_usuario === 'ADMIN' && this.loginForm.value.vc_clave === '123456') {
        data.access_token = 'admin'

      }

      this.authService.login(data);

      /* await this.loadItemsFromApi(); */
      this.loading = false;
      this.router.navigate(['/dashboard']);

    }

    return

    /* }, (error) =>{
      this.mensaje_error = error.error.error;
      this.showToastMessage()
    }); */

  }

  async loadItemsFromApi() {
    try {
      //this.isLoading = true;
      const items: any = await this.apiService.consulta('athena/column?column=client_ruc', 'get').toPromise();
      const names: any = await this.apiService.consulta('athena/column?column=client_name', 'get').toPromise();
      /* const numbers: any = await this.apiService.consulta('athena/column?column=document_number', 'get').toPromise(); */
      const locations: any = await this.apiService.consulta('athena/column?column=document_location', 'get').toPromise();
      /* const rucsObjects = await items.data.map((ruc: any) => ({ client_ruc: ruc }));
      console.log('nuevo objeto: ',rucsObjects[0]); */
      await this.indexedDbService.addItems(items.data, 'client_ruc'); // Guardar en la base local
      await this.indexedDbService.addItems(names.data, 'client_name'); // Guardar en la base local
     /*  await this.indexedDbService.addItems(numbers.data, 'document_number'); // Guardar en la base local */
      await this.indexedDbService.addItems(locations.data, 'document_location'); // Guardar en la base local
      //this.isLoading = false;
    } catch (error) {
      console.error('Error al cargar los datos:', error);
      //this.isLoading = false;
    }
  }


}
