import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { UserService } from '../../../service/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule, RouterLink],
  templateUrl: './login-page.component.html',
})
export default class LoginPageComponent {
  credentials = signal({
    email: '',
    password: '',
  });

  errorMessage = signal('');

  router = inject(Router);
  private userService = inject(UserService);

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.router.navigate(['/user/list']);
    }
  }

  handleLogin() {
    const email = this.credentials().email;
    const password = this.credentials().password;
    this.userService
      .login(email, password)
      .pipe(
        tap(() => localStorage.setItem('email', email)),
        tap(() => this.router.navigate(['/user'])),
        catchError((error) => {
          this.errorMessage.set(error.error.message)
          return of(null);
        })
      )
      .subscribe((resp) => {
        console.log('Login successful', resp);
      });
  }
}
