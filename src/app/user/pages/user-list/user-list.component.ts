import { Component, inject, OnInit, signal } from '@angular/core';
import { switchMap, tap, catchError } from 'rxjs';
import { UserFormComponent } from './user-form/user-form.component';
import { of } from 'rxjs';
import { UserTableComponent } from './user-table/user-table.component';
import { UserService } from '../../../service/user.service';
import { CreateUserRequest, User } from '../../../models';
import { UserListResponse } from '../../../models/dto.response/user-list.response';

@Component({
  selector: 'app-user-list',
  imports: [UserFormComponent, UserTableComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export default class UserListComponent implements OnInit {
  userList = signal<UserListResponse[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  private userService = inject(UserService);

  ngOnInit(): void {
    this.loadUsers();
  }

  onUserCreated(userData: CreateUserRequest): void {
    this.loading.set(true);
    this.error.set(null);

    // this.userService
    //   .save(userData)
    //   .pipe(
    //     switchMap(() => this.userService.getAll()),
    //     tap((users) => {
    //       this.userList.set(users);
    //       this.loading.set(false);
    //     }),
    //     catchError((error) => {
    //       this.error.set(`Error al crear el usuario: ${error.message}`);
    //       this.loading.set(false);
    //       return of([]);
    //     })
    //   )
    //   .subscribe();
  }

  private loadUsers(): void {
    this.loading.set(true);
    this.error.set(null);

    this.userService
      .getAll()
      .pipe(
        tap((users) => {
          this.userList.set(users);
          this.loading.set(false);
        }),
        catchError((error) => {
          console.error('Error loading users:', error);
          this.error.set('Error al cargar los usuarios');
          this.loading.set(false);
          return of([]);
        })
      )
      .subscribe();
  }
}
