import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private ApiUrl = 'http://localhost:8080';
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<User[]>(`${this.ApiUrl}/users`);
  }

  getById(id: number) {
    return this.http.get<User>(`${this.ApiUrl}/users/${id}`);
  }

  save(user: User) {
    return this.http.post<User>(`${this.ApiUrl}/users`, user);
  }

  deleteById(id: number) {
    return this.http.delete<any>(`${this.ApiUrl}/users/${id}`);
  }

  login(email: string, password: string) {
    return this.http.post(`${this.ApiUrl}/api/v1/users/login`, { email, password });
  }
}
