import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentosFaildComponent } from './pages/documentos-faild/documentos-faild.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentosFaildComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentosFaildRoutingModule { }
