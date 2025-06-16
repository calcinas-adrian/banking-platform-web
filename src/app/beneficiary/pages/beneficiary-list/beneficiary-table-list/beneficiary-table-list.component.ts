import { Component, input, output } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { BeneficiaryTableResponse } from '../../../../models';

@Component({
  selector: 'app-beneficiary-table-list',
  imports: [KeyValuePipe],
  templateUrl: './beneficiary-table-list.component.html',
  styleUrl: './beneficiary-table-list.component.css',
})
export class BeneficiaryTableListComponent {
  beneficiaryList = input.required<BeneficiaryTableResponse[]>();
  beneficiaryId = output<number>();

  /**
   * Obtiene las iniciales del alias o genera por defecto
   */
  getAliasInitials(alias?: string): string {
    if (!alias) return 'B';
    return alias.charAt(0).toUpperCase();
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
  getAccountStatusLabel(status: string): string {
    const statuses: { [key: string]: string } = {
      ACTIVE: 'Activa',
      CLOSED: 'Cerrada',
      SUSPENDED: 'Suspendida',
      PENDING: 'Pendiente',
    };
    return statuses[status] || status;
  }

  /**
   * Obtiene estadísticas generales
   */
  getBeneficiaryStats() {
    const beneficiaries = this.beneficiaryList();
    const currencies = new Set(beneficiaries.map((b) => b.accountCurrency));
    const accountTypes = new Set(beneficiaries.map((b) => b.accountType));

    return {
      total: beneficiaries.length,
      active: beneficiaries.filter((b) => b.accountStatus === 'ACTIVE').length,
      currencies: Array.from(currencies),
      accountTypes: Array.from(accountTypes),
      withAlias: beneficiaries.filter((b) => b.alias && b.alias.trim()).length,
      withDescription: beneficiaries.filter(
        (b) => b.description && b.description.trim()
      ).length,
    };
  }

  /**
   * Obtiene el total de beneficiarios por moneda
   */
  getBeneficiariesByCurrency(): { [currency: string]: number } {
    const totals: { [currency: string]: number } = {};

    this.beneficiaryList().forEach((beneficiary) => {
      if (!totals[beneficiary.accountCurrency]) {
        totals[beneficiary.accountCurrency] = 0;
      }
      totals[beneficiary.accountCurrency]++;
    });

    return totals;
  }

  /**
   * Obtiene el número de beneficiarios con cuentas activas
   */
  getActiveBeneficiariesCount(): number {
    return this.beneficiaryList().filter((b) => b.accountStatus === 'ACTIVE')
      .length;
  }

  deleteBeneficiary(beneficiaryId: number | undefined): void {
    if (!beneficiaryId) return;
    this.beneficiaryId.emit(beneficiaryId);
  }
}
