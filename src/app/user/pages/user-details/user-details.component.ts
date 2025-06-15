import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { User } from '../../../models';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user-details.component.html',
})
export default class UserComponent implements OnInit {
  private router = inject(Router);
  private userService = inject(UserService);

  user = signal<User>({} as User);

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    if (!email) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.userService
      .getUserByEmail(email)
      .subscribe((user) => this.user.set(user));
  }

  showAccountsDetails() {
    if (!this.user().id) {
      return;
    }

    this.router.navigate(['/account/list', this.user().id]);
  }
}
