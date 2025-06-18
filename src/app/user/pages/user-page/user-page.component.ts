import { Component, inject, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { UserService } from '../../../service/user.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-user-page',
  imports: [RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './user-page.component.html',
})
export default class UserPageComponent implements OnInit {
  private router = inject(Router);
  private userService = inject(UserService);

  listLinks = [
    {
      name: 'Home',
      url: '/',
    },
    {
      name: 'Ver todas las cuentas',
      url: '/account',
    },
  ];

  ngOnInit(): void {
    const email = localStorage.getItem('email') ?? '';
    if (!email) {
      this.router.navigate(['/login']);
    }

    this.userService.getUserByEmail(email).subscribe((user) => {
      if (user.rol?.name !== 'ADMIN') {
        this.router.navigate(['/user/details']);
      }
    });
  }

  handleLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
