import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account, AccountTableResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private ApiUrl = 'http://localhost:8080/api/v1';
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<Account[]>(`${this.ApiUrl}/account`);
  }

  getById(id: number) {
    return this.http.get<Account>(`${this.ApiUrl}/account/${id}`);
  }

  save(account: Account) {
    return this.http.post<Account>(`${this.ApiUrl}/account`, account);
  }

  deleteById(id: number) {
    return this.http.delete<any>(`${this.ApiUrl}/account/${id}`);
  }

  update(account: Account) {
    return this.http.put<Account>(
      `${this.ApiUrl}/account/${account.id}`,
      account
    );
  }

  getByUser(userId: number) {
    return this.http.get<AccountTableResponse[]>(
      `${this.ApiUrl}/account/user/${userId}`
    );
  }
}
