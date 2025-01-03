import { Routes } from "@angular/router";

export const CommonLayout_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'monitoreo',
    loadChildren: () => import('../../modules/monitoreo/monitoreo.module').then(m => m.MonitoreoModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('../../modules/chat/chat.module').then(m => m.ChatModule)
  }

];
