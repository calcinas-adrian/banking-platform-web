import { Component, inject, OnInit, signal } from '@angular/core';
import { map, switchMap, tap } from 'rxjs';
import { AccountTableListComponent } from './account-table-list/account-table-list.component';
import {
  AccountTableResponse,
  BeneficiaryTableResponse,
} from '../../../models';
import { AccountService } from '../../../service/account.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { BeneficiaryService } from '../../../service/beneficiary.service';
import { FormsModule } from '@angular/forms';
import { CreateTransferFormComponent } from '../../components/create-transfer-form/create-transfer-form.component';
import { TransactionResponse } from '../../../models/dto.response/transaction.response';

@Component({
  selector: 'app-account-list',
  imports: [
    AccountTableListComponent,
    FormsModule,
    CreateTransferFormComponent,
  ],
  templateUrl: './account-list.component.html',
})
export default class AccountListComponent implements OnInit {
  id = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => +params['userId']))
  );
  private router = inject(Router);
  private accountService = inject(AccountService);
  private userService = inject(UserService);
  private beneficiaryService = inject(BeneficiaryService);

  isLoading = signal(true);
  error = signal<string | null>(null);
  currentUserId = signal<number>(0);
  beneficiaries = signal<BeneficiaryTableResponse[]>([]);
  accountList = signal<AccountTableResponse[]>([]);

  filteredBeneficiaries = signal<BeneficiaryTableResponse[]>([]);

  ngOnInit(): void {
    const userId = this.id();
    const email = localStorage.getItem('email') ?? '';
    if (!email) {
      this.router.navigate(['/auth/login']);
      return;
    }
    if (!userId || isNaN(userId)) {
      return;
    }

    this.accountService
      .getByUser(userId)
      .pipe(tap((accounts) => this.accountList.set(accounts)))
      .subscribe();

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
          this.currentUserId.set(user.id);
          return this.beneficiaryService.getBeneficiariesByUser(user.id);
        }),
        map((beneficiaries) =>
          beneficiaries.filter((beneficiary) => !beneficiary.deleted)
        )
      )
      .subscribe({
        next: (beneficiaries) => {
          console.log('Beneficiaries:', beneficiaries);
          this.beneficiaries.set(beneficiaries as BeneficiaryTableResponse[]);
          this.filteredBeneficiaries.set(
            beneficiaries as BeneficiaryTableResponse[]
          );
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error loading beneficiaries:', error);
          this.error.set('Error al cargar los beneficiarios');
          this.isLoading.set(false);
        },
      });
  }

  onAccountCreated(account: AccountTableResponse): void {
    this.accountList.update((accounts) => [...accounts, account]);
  }

  onTransferCompleted(transfer: TransactionResponse): void {
    console.log('Transfer completed:', transfer);

    // Opcional: Mostrar una notificación de éxito
    // Opcional: Refrescar la lista de cuentas para mostrar balances actualizados
    const userId = this.id();
    if (userId) {
      this.accountService
        .getByUser(userId)
        .pipe(tap((accounts) => this.accountList.set(accounts)))
        .subscribe();
    }
  }
}
