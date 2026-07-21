import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account, AccountTableResponse } from '../models';
import { AccountsAndBalancesResponse } from '../models/dto.response/accounts-and-balances.response';
import { environment } from '../../environments/environment';

const API_URL = `${environment.apiUrl}/v1`;

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<AccountsAndBalancesResponse[]>(`${API_URL}/account`);
  }

  getById(id: number) {
    return this.http.get<Account>(`${API_URL}/account/${id}`);
  }

  save(account: Account) {
    return this.http.post<Account>(`${API_URL}/account`, account);
  }

  deleteById(id: number) {
    return this.http.delete<any>(`${API_URL}/account/${id}`);
  }

  update(account: Account) {
    return this.http.put<Account>(`${API_URL}/account/${account.id}`, account);
  }

  getByUser(userId: number) {
    return this.http.get<AccountTableResponse[]>(
      `${API_URL}/account/user/${userId}`,
    );
  }
}
