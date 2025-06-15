import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'user',
    loadComponent: () => import('./user/pages/user-page/user-page.component'),
    children: [
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./user/pages/user-edit-page/user-edit-page.component'),
      },
      {
        path: 'list',
        loadComponent: () =>
          import('./user/pages/user-list/user-list.component'),
      },
      {
        path: 'details',
        loadComponent: () =>
          import('./user/pages/user-details/user-details.component'),
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
  {
    path: 'account',
    loadComponent: () =>
      import('./account/pages/account-page/account-page.component'),
    children: [
      {
        path: 'list/:userId',
        loadComponent: () =>
          import('./account/pages/account-list/account-list.component'),
      },
      // {
      //   path: 'edit',
      //   // loadComponent: () =>
      //   //   import('./account/pages/account-edit/account-edit.component'),
      // },
      // {
      //   path: ':id',
      //   // loadComponent: () =>
      //   //   import('./account/pages/account-detail/account-detail.component'),
      // },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
  {
    path: 'auth',
    loadComponent: () => import('./auth/pages/auth-page/auth-page.component'),
    children: [
      {
        path: 'new-user',
        loadComponent: () =>
          import('./auth/pages/new-user-page/new-user-page.component'),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./auth/pages/login-page/login-page.component'),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/auth',
  },
];
