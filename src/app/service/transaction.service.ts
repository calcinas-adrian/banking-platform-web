import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../models';
import { CreateTransactionRequest } from '../models/dto.request/create-transaction.request';
import { TransactionResponse } from '../models/dto.response/transaction.response';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private ApiUrl = 'http://localhost:8080/api/v1';
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<Transaction[]>(`${this.ApiUrl}/transaction`);
  }

  getById(id: number) {
    return this.http.get<Transaction>(`${this.ApiUrl}/transaction/${id}`);
  }

  create(transaction: CreateTransactionRequest) {
    return this.http.post<TransactionResponse>(
      `${this.ApiUrl}/transaction`,
      transaction
    );
  }

  deleteById(id: number) {
    return this.http.delete<any>(`${this.ApiUrl}/transaction/${id}`);
  }

  update(transaction: Transaction) {
    return this.http.put<Transaction>(
      `${this.ApiUrl}/transaction/${transaction.id}`,
      transaction
    );
  }

  getByAccount(accountId: number) {
    return this.http.get<Transaction[]>(
      `${this.ApiUrl}/transaction/account/${accountId}`
    );
  }

  getByUser(userId: number) {
    return this.http.get<Transaction[]>(
      `${this.ApiUrl}/transaction/user/${userId}`
    );
  }
}
