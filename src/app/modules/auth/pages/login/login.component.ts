import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient,private fb: FormBuilder){
    this.loginForm = this.fb.group({
      vc_usuario: ['', [Validators.required]],
      vc_clave: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.loginForm.get('vc_usuario')?.valueChanges.subscribe((value) => {
      this.loginForm.get('vc_usuario')?.setValue(value.toUpperCase(), { emitEvent: false });
    });
  }

  login(){
/*     this.http.post(this.base_url+'auth/login', this.loginForm.value).subscribe((resp: any) => {
 */

    if (this.loginForm.valid) {
      const data= {
        access_token: 'asd123'
      }
      this.authService.login(data);
      return this.router.navigate(['/documentos']);
    }

    return

    /* }, (error) =>{
      this.mensaje_error = error.error.error;
      this.showToastMessage()
    }); */

  }
}
