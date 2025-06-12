import { Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-user-page',
  imports: [RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './user-page.component.html',
})
export default class UserPageComponent {
  private router = inject(Router);

  listLinks = [
    {
      name: 'Home',
      url: '/',
    },
    {
      name: 'Ver todas las cuentas',
      url: '/account',
    },
    {
      name: 'Lista de Usuarios',
      url: '/user/list',
    },
  ];

  handleLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
