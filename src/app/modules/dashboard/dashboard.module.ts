import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { MapsComponent } from './pages/maps/maps.component';
import { GoogleMapsModule } from '@angular/google-maps';

import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
  declarations: [
    DashboardComponent,
    MapsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,

    GoogleMapsModule,

    NgApexchartsModule

  ]
})
export class DashboardModule { }
