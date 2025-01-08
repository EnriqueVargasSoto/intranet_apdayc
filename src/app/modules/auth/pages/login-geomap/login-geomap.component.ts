import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service/api.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { IndexDbService } from 'src/app/services/index-db/index-db.service';

@Component({
  selector: 'app-login-geomap',
  templateUrl: './login-geomap.component.html',
  styleUrls: ['./login-geomap.component.scss']
})
export class LoginGeomapComponent {

  loginForm: FormGroup;

  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient,private fb: FormBuilder, private apiService: ApiService){
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
}
