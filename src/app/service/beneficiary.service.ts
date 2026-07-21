import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beneficiary } from '../models';
import { SaveBeneficiaryRequest } from '../models/dto.request/save-beneficiary.request';
import { environment } from '../../environments/environment';

const API_URL = `${environment.apiUrl}/v1`;

@Injectable({ providedIn: 'root' })
export class BeneficiaryService {
  private http = inject(HttpClient);

  getBeneficiariesByUser(userId: number): Observable<Beneficiary[]> {
    return this.http.get<Beneficiary[]>(
      `${API_URL}/beneficiary/user/${userId}`,
    );
  }

  delete(beneficiaryId: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/beneficiary/${beneficiaryId}`);
  }

  getAll(): Observable<Beneficiary[]> {
    return this.http.get<Beneficiary[]>(`${API_URL}/beneficiary`);
  }

  saveBeneficiary(
    beneficiary: Partial<SaveBeneficiaryRequest>,
  ): Observable<Beneficiary> {
    return this.http.post<Beneficiary>(`${API_URL}/beneficiary`, beneficiary);
  }
}
