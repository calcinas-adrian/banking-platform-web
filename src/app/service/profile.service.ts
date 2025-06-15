import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GetProfileByIDResponse } from '../models/dto.response/get-profile-by-id.response';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private ApiUrl = 'http://localhost:8080/api/v1/profile';
  private http = inject(HttpClient);

  getProfileById(id: number): Observable<GetProfileByIDResponse> {
    return this.http.get<GetProfileByIDResponse>(`${this.ApiUrl}/${id}`);
  }
}
