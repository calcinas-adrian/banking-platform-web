import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../models';
import { CreateTransactionRequest } from '../models/dto.request/create-transaction.request';
import { TransactionResponse } from '../models/dto.response/transaction.response';
import { environment } from '../../environments/environment';

const API_URL = `${environment.apiUrl}/v1`;

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<Transaction[]>(`${API_URL}/transaction`);
  }

  getById(id: number) {
    return this.http.get<Transaction>(`${API_URL}/transaction/${id}`);
  }

  create(transaction: CreateTransactionRequest) {
    return this.http.post<TransactionResponse>(
      `${API_URL}/transaction`,
      transaction,
    );
  }

  deleteById(id: number) {
    return this.http.delete<any>(`${API_URL}/transaction/${id}`);
  }

  update(transaction: Transaction) {
    return this.http.put<Transaction>(
      `${API_URL}/transaction/${transaction.id}`,
      transaction,
    );
  }

  getByAccount(accountId: number) {
    return this.http.get<Transaction[]>(
      `${API_URL}/transaction/account/${accountId}`,
    );
  }

  getByUser(userId: number) {
    return this.http.get<Transaction[]>(
      `${API_URL}/transaction/user/${userId}`,
    );
  }
}
