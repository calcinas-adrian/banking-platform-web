import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beneficiary } from '../models';

@Injectable({ providedIn: 'root' })
export class BeneficiaryService {
  private ApiUrl = 'http://localhost:8080/api/v1';
  private http = inject(HttpClient);

  getBeneficiariesByUser(userId: number): Observable<Beneficiary[]> {
    return this.http.get<Beneficiary[]>(
      `${this.ApiUrl}/beneficiary/user/${userId}`
    );
  }
}
