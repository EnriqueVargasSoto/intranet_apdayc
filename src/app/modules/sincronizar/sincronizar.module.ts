import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SincronizarRoutingModule } from './sincronizar-routing.module';
import { SincronizarComponent } from './pages/sincronizar/sincronizar.component';


@NgModule({
  declarations: [
    SincronizarComponent
  ],
  imports: [
    CommonModule,
    SincronizarRoutingModule
  ]
})
export class SincronizarModule { }
