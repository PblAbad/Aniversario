import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'timeline',
        loadComponent: () =>
          import('./components/timeline/timeline.component').then(
            (m) => m.TimelineComponent
          ),
      },
      {
        path: 'gallery',
        loadComponent: () =>
          import('./components/gallery/gallery.component').then(
            (m) => m.GalleryComponent
          ),
      },
      {
        path: 'mensaje',
        loadComponent: () =>
          import('./components/mensajes/mensajes.component').then(
            (m) => m.MensajesComponent
          ),
      },
      {
        path: 'musica',
        loadComponent: () =>
          import('./components/musica/musica.component').then(
            (m) => m.MusicaComponent
          ),
      },
      {
        path: 'calendario',
        loadComponent: () =>
          import('./components/calendario/calendario.component').then(
            (m) => m.CalendarioComponent
          ),
      },
      {
        path: 'proposicion',
        loadComponent: () =>
          import('./components/proposicion/proposicion.component').then(
            (m) => m.ProposicionComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'home',
      },
];
