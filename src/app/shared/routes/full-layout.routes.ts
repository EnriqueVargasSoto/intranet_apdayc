import { Routes } from "@angular/router";

export const FullLayout_ROUTES: Routes = [
  {
    path: 'login',
    loadChildren: () => import('../../modules/auth/auth.module').then(m => m.AuthModule)
  }
];
