import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../../service/account.service';
import { AccountsAndBalancesResponse } from '../../../models/dto.response/accounts-and-balances.response';

@Component({
  selector: 'app-view-accounts-and-balances',
  imports: [CommonModule],
  templateUrl: './view-accounts-and-balances.component.html',
  styleUrls: ['./view-accounts-and-balances.component.css'],
})
export class ViewAccountsAndBalancesComponent implements OnInit {
  private accountService = inject(AccountService);

  accounts: AccountsAndBalancesResponse[] = [];
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  totalAccounts = 0;
  totalBalance = 0;
  activeAccounts = 0;
  currentDate = new Date();

  ngOnInit(): void {
    this.loadAccounts();
  }

  private loadAccounts(): void {
    this.loading.set(true);
    this.error.set(null);

    this.accountService.getAll().subscribe((data) => {
      console.log(data)
      this.accounts = data;
      this.calculateSummary();
      this.loading.set(false);
    });
  }

  private calculateSummary(): void {
    this.totalAccounts = this.accounts?.length || 0;
    this.totalBalance =
      this.accounts?.reduce(
        (sum, account) => sum + (account.balance || 0),
        0
      ) || 0;
    this.activeAccounts =
      this.accounts?.filter((account) => account.status === 'ACTIVE').length ||
      0;
  }

  reloadAccounts(): void {
    this.loadAccounts();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'ACTIVE':
        return 'badge bg-success';
      case 'SUSPENDED':
        return 'badge bg-warning';
      case 'CLOSED':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  }

  getTypeClass(type: string): string {
    switch (type) {
      case 'SAVINGS':
        return 'text-primary';
      case 'CHECKING':
        return 'text-info';
      case 'INVALID_TYPE':
        return 'text-danger';
      default:
        return 'text-secondary';
    }
  }

  formatDate(dateString: string | Date | undefined): string {
    if (!dateString) return 'No disponible';
    const date =
      typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}
