import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitoreoComponent } from './pages/monitoreo/monitoreo.component';
import { MapsComponent } from './pages/maps/maps.component';

const routes: Routes = [
  {
    path: '',
    component: MonitoreoComponent
  },
  {
    path: 'maps',
    component: MapsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoreoRoutingModule { }
