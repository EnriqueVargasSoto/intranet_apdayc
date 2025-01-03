import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MonitoreoRoutingModule } from './monitoreo-routing.module';
import { MonitoreoComponent } from './pages/monitoreo/monitoreo.component';
import { MapsComponent } from './pages/maps/maps.component';
import { GoogleMapsModule } from '@angular/google-maps';


@NgModule({
  declarations: [
    MonitoreoComponent,
    MapsComponent
  ],
  imports: [
    CommonModule,
    MonitoreoRoutingModule,

    GoogleMapsModule
  ],
  providers: [DatePipe]
})
export class MonitoreoModule { }
