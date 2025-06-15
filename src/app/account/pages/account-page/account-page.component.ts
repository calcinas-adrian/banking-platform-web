import { Component, inject, OnInit, signal } from '@angular/core';
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
export default class AccountPageComponent implements OnInit {
  private router = inject(Router);

  email = signal<string>('??');

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

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    if (!email) {
      this.router.navigate(['/login']);
      return;
    }

    this.email.set(email);
  }

  handleLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
