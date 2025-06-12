import { Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-account-page',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './account-page.component.html',
})
export default class AccountPageComponent {
  private router = inject(Router);

  listLinks = [
    {
      name: 'Home',
      url: '/',
    },
    {
      name: 'Lista de Cuentas',
      url: '/account/list',
    },
    {
      name: 'Ver todos los usuarios',
      url: '/user',
    },
  ];

  handleLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
