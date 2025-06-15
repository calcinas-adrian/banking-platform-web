import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models';
import { map, Observable } from 'rxjs';
import { LoginSuccesfullyResponse } from '../models/dto.response/login.response';
import { GetUserByEmailResponse } from '../models/dto.response/get-user-by-email.response';

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

  login(email: string, password: string): Observable<LoginSuccesfullyResponse> {
    return this.http.post<LoginSuccesfullyResponse>(
      `${this.ApiUrl}/api/v1/users/login`,
      { email, password }
    );
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http
      .post<GetUserByEmailResponse>(
        `${this.ApiUrl}/api/v1/users/search/email`,
        {
          email,
        }
      )
      .pipe(
        map((response: GetUserByEmailResponse) => {
          return {
            id: response.id,
            email: response.email,
            profile: {
              id: response.profile.id,
              ci: response.profile.ci,
              status: response.profile.status,
              mobile: response.profile.mobile,
              active: response.profile.active,
              name: response.profile.fullName,
            },
            rol: {
              id: response.rol.id,
              name: response.rol.name,
              description: response.rol.description,
              active: response.rol.active,
            },
            accounts: response.accounts,
            totalAccounts: response.totalAccounts,
            status: response.status,
            addDate: response.addDate,
            changeDate: response.changeDate,
            deleted: response.deleted,
          };
        })
      );
  }
}
