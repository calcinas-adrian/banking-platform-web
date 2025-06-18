import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';

@Component({
  selector: 'app-account-page',
  imports: [RouterOutlet, TopBarComponent],
  templateUrl: './account-page.component.html',
})
export default class AccountPageComponent implements OnInit {
  private router = inject(Router);

  email = signal<string>('??');

  listLinks = [
    {
      name: 'Home',
      url: '/',
      icon: 'fas fa-envelope',
    },
    {
      name: 'Lista de Cuentas',
      url: '/account/list',
      icon: 'fas fa-envelope',
    },
    {
      name: 'Ver todos los usuarios',
      url: '/user',
      icon: 'fas fa-envelope',
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
