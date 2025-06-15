import { Component, inject, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { catchError, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../../../models';
import { UserService } from '../../../../service/user.service';

@Component({
  selector: 'app-user-table',
  // imports: [DatePipe],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
})
export class UserTableComponent {
  userList = input.required<User[]>();
  isLoading = output<boolean>();
  error = output<string | null>();
  newUserList = output<User[]>();

  private router = inject(Router);
  private userService = inject(UserService);

  sendToEdit(userId: number) {
    this.router.navigate(['/user/details', userId]);
  }

  deleteUser(userId: number): void {
    this.isLoading.emit(true);
    this.error.emit(null);

    this.userService
      .deleteById(userId)
      .pipe(
        switchMap(() => this.userService.getAll()),
        tap((users) => {
          this.newUserList.emit(users);
          this.isLoading.emit(false);
        }),
        catchError((error) => {
          this.error.emit(`Error deleting user: ${error.message}`);
          this.isLoading.emit(false);
          return of([]);
        })
      )
      .subscribe();
  }
}
