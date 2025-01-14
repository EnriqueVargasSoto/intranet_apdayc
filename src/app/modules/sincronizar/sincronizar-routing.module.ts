import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SincronizarComponent } from './pages/sincronizar/sincronizar.component';

const routes: Routes = [
  {
    path: '',
    component: SincronizarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SincronizarRoutingModule { }
