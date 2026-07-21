import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateUserRequest, User } from '../models';
import { UpdateUserRequest } from '../models/dto/update-user-request.dto';
import { map, Observable } from 'rxjs';
import { LoginSuccesfullyResponse } from '../models/dto.response/login.response';
import { GetUserByEmailResponse } from '../models/dto.response/get-user-by-email.response';
import { UserListResponse } from '../models/dto.response/user-list.response';
import { environment } from '../../environments/environment';

const API_URL = `${environment.apiUrl}/v1`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<UserListResponse[]>(`${API_URL}/users`);
  }

  getById(id: number) {
    return this.http.get<User>(`${API_URL}/users/${id}`);
  }
  save(user: CreateUserRequest) {
    return this.http.post<User>(`${API_URL}/users`, user);
  }

  update(user: UpdateUserRequest) {
    return this.http.put<User>(`${API_URL}/users/${user.id}`, user);
  }

  deleteById(id: number) {
    return this.http.delete<any>(`${API_URL}/users/${id}`);
  }

  login(email: string, password: string): Observable<LoginSuccesfullyResponse> {
    return this.http.post<LoginSuccesfullyResponse>(`${API_URL}/users/login`, {
      email,
      password,
    });
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http
      .post<GetUserByEmailResponse>(`${API_URL}/users/search/email`, {
        email,
      })
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
        }),
      );
  }
}
