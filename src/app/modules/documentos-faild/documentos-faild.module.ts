import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentosFaildRoutingModule } from './documentos-faild-routing.module';
import { DocumentosFaildComponent } from './pages/documentos-faild/documentos-faild.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DocumentosFaildComponent
  ],
  imports: [
    CommonModule,
    DocumentosFaildRoutingModule,

    FormsModule
  ]
})
export class DocumentosFaildModule { }
