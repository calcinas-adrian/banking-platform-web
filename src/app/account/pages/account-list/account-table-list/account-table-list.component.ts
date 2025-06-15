import { Component, inject, input } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { AccountTableResponse } from '../../../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-table-list',
  imports: [KeyValuePipe],
  templateUrl: './account-table-list.component.html',
  styleUrl: './account-table-list.component.css',
})
export class AccountTableListComponent {
  private router = inject(Router);
  accountList = input.required<AccountTableResponse[]>();

  showBeneficiariesDetails() {
    this.router.navigate(['/beneficiaries/list']);
  }

  /**
   * Obtiene las iniciales del nombre y apellido
   */
  getInitials(firstName?: string, lastName?: string): string {
    const first = firstName?.charAt(0)?.toUpperCase() || '';
    const last = lastName?.charAt(0)?.toUpperCase() || '';
    return `${first}${last}` || '??';
  }

  /**
   * Formatea el saldo de la cuenta
   */
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-BO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  /**
   * Obtiene la etiqueta del tipo de cuenta
   */
  getAccountTypeLabel(type: string): string {
    const types: { [key: string]: string } = {
      SAVINGS: 'Ahorros',
      CHECKING: 'Corriente',
      INVESTMENT: 'Inversión',
    };
    return types[type] || type;
  }

  /**
   * Obtiene la etiqueta del estado de la cuenta
   */
  getStatusLabel(status: string): string {
    const statuses: { [key: string]: string } = {
      ACTIVE: 'Activa',
      CLOSED: 'Cerrada',
      SUSPENDED: 'Suspendida',
      PENDING: 'Pendiente',
    };
    return statuses[status] || status;
  }

  /**
   * Formatea una fecha
   */
  formatDate(dateInput?: string | Date): string {
    if (!dateInput) return '';

    try {
      const date =
        typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
      return new Intl.DateTimeFormat('es-BO', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch (error) {
      return dateInput.toString();
    }
  }

  /**
   * Calcula el total de saldos por moneda
   */
  getTotalBalancesByCurrency(): { [currency: string]: number } {
    const totals: { [currency: string]: number } = {};

    this.accountList().forEach((account) => {
      if (!totals[account.currency]) {
        totals[account.currency] = 0;
      }
      totals[account.currency] += account.balance;
    });

    return totals;
  }

  /**
   * Obtiene el número total de cuentas activas
   */
  getActiveAccountsCount(): number {
    return this.accountList().filter((account) => account.status === 'ACTIVE')
      .length;
  }

  /**
   * Obtiene estadísticas generales
   */
  getAccountStats() {
    const accounts = this.accountList();
    return {
      total: accounts.length,
      active: accounts.filter((a) => a.status === 'ACTIVE').length,
      closed: accounts.filter((a) => a.status === 'CLOSED').length,
      suspended: accounts.filter((a) => a.status === 'SUSPENDED').length,
      totalTransactions: accounts.reduce(
        (sum, a) => sum + (a.totalTransactions || 0),
        0
      ),
      totalBeneficiaries: accounts.reduce(
        (sum, a) => sum + (a.activeBeneficiaries || 0),
        0
      ),
    };
  }
}
