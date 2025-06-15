import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { BeneficiaryService } from '../../../service/beneficiary.service';
import { BeneficiaryTableResponse } from '../../../models';
import { BeneficiaryTableListComponent } from './beneficiary-table-list/beneficiary-table-list.component';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-beneficiary-list',
  imports: [BeneficiaryTableListComponent],
  templateUrl: './beneficiary-list.component.html',
})
export default class BeneficiaryListComponent implements OnInit {
  private router = inject(Router);
  private userService = inject(UserService);
  private beneficiaryService = inject(BeneficiaryService);

  beneficiaries = signal<BeneficiaryTableResponse[]>([]);
  isLoading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const email = localStorage.getItem('email') ?? '';
    if (!email) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.getBeneficiaryList(email);
  }

  private getBeneficiaryList(email: string): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.userService
      .getUserByEmail(email)
      .pipe(
        switchMap((user) => {
          if (!user || !user.id) {
            this.router.navigate(['/auth/login']);
            return [];
          }
          return this.beneficiaryService.getBeneficiariesByUser(user.id);
        })
      )
      .subscribe({
        next: (beneficiaries) => {
          console.log('Beneficiaries:', beneficiaries);
          // Cast the response to our DTO type since the API returns the extended data
          this.beneficiaries.set(beneficiaries as BeneficiaryTableResponse[]);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error loading beneficiaries:', error);
          this.error.set('Error al cargar los beneficiarios');
          this.isLoading.set(false);
        },
      });
  }
}
