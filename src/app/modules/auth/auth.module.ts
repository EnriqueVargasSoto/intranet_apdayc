import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginGeomapComponent } from './pages/login-geomap/login-geomap.component';


@NgModule({
  declarations: [
    LoginComponent,
    LoginGeomapComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,

    ReactiveFormsModule
  ]
})
export class AuthModule { }
