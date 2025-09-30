import { Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';

export const routes: Routes = [
  // home como single page (las secciones están en AppComponent)
  { path: '', loadComponent: () => import('./app.component').then(m => m.AppComponent) },
  { path: '**', redirectTo: '' },
];

