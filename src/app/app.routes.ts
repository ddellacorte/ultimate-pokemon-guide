import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pokemon',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/pokemon/pokemon').then((m) => m.Pokemon),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./pages/pokemon/pokemon-info/pokemon-info').then(
            (m) => m.PokemonInfo
          ),
      },
    ],
  },
  {
    path: 'natures',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/nature/nature').then((m) => m.Nature),
      },
      // {
      //   path: ':id',
      //   loadComponent: () =>
      //     import('./components/pokemon/pokemon-info/pokemon-info').then(
      //       (m) => m.PokemonInfo
      //     ),
      // },
    ],
  },
  {
    path: 'moves',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/move/move').then((m) => m.Move),
      },
      // {
      //   path: ':id',
      //   loadComponent: () =>
      //     import('./components/pokemon/pokemon-info/pokemon-info').then(
      //       (m) => m.PokemonInfo
      //     ),
      // },
    ],
  },
  {
    path: 'abilities',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/ability/ability').then((m) => m.Ability),
      },
      // {
      //   path: ':id',
      //   loadComponent: () =>
      //     import('./components/pokemon/pokemon-info/pokemon-info').then(
      //       (m) => m.PokemonInfo
      //     ),
      // },
    ],
  },
  {
    path: 'items',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/item/item').then((m) => m.Item),
      },
      // {
      //   path: ':id',
      //   loadComponent: () =>
      //     import('./components/pokemon/pokemon-info/pokemon-info').then(
      //       (m) => m.PokemonInfo
      //     ),
      // },
    ],
  },
  {
    path: '',
    redirectTo: 'pokemon',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'pokemon',
  },
];
