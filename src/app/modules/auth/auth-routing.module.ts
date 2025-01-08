import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LoginGeomapComponent } from './pages/login-geomap/login-geomap.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'geomap',
    component: LoginGeomapComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
