import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GetProfileByIDResponse } from '../models/dto.response/get-profile-by-id.response';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const API_URL = `${environment.apiUrl}/v1/profile`;

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private http = inject(HttpClient);

  getProfileById(id: number): Observable<GetProfileByIDResponse> {
    return this.http.get<GetProfileByIDResponse>(`${API_URL}/${id}`);
  }
}
