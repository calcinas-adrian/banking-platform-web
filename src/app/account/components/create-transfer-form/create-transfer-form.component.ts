import {
  Component,
  input,
  output,
  signal,
  effect,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  BeneficiaryTableResponse,
  AccountTableResponse,
} from '../../../models';
import { TransactionService } from '../../../service/transaction.service';
import { TransactionResponse } from '../../../models/dto.response/transaction.response';
import { CreateTransactionRequest } from '../../../models/dto.request/create-transaction.request';

@Component({
  selector: 'app-create-transfer-form',
  imports: [FormsModule],
  templateUrl: './create-transfer-form.component.html',
  styleUrl: './create-transfer-form.component.css',
})
export class CreateTransferFormComponent {
  beneficiaries = input.required<BeneficiaryTableResponse[]>();
  accountList = input.required<AccountTableResponse[]>();
  isLoading = input.required<boolean>();
  transferCompleted = output<TransactionResponse>();

  private transactionService = inject(TransactionService);

  // Signals para el formulario de transferencia
  sourceAccountId = signal<number | null>(null);
  targetAccountId = signal<number | null>(null);
  transactionType = signal<string>('TRANSFER');
  amount = signal<number>(0);
  description = signal<string>('');
  reference = signal<string>('');
  isTransferring = signal<boolean>(false);
  transferError = signal<string | null>(null);

  // Signals para la búsqueda de beneficiarios
  selectedBeneficiary = signal<string>('');
  filteredBeneficiaries = signal<BeneficiaryTableResponse[]>([]);

  // Opciones disponibles
  transactionTypes = [
    { value: 'DEPOSIT', label: 'Depósito' },
    { value: 'WITHDRAWAL', label: 'Retiro' },
    { value: 'TRANSFER', label: 'Transferencia' },
    { value: 'PAYMENT', label: 'Pago' },
  ];

  constructor() {
    effect(() => {
      this.filteredBeneficiaries.set(this.beneficiaries());
    });
  }

  // Función para realizar una transferencia
  async makeTransfer(): Promise<void> {
    if (this.isTransferring()) return;

    if (!this.sourceAccountId() || this.amount() <= 0) {
      this.transferError.set(
        'Por favor, selecciona una cuenta origen y un monto válido.'
      );
      return;
    }

    this.isTransferring.set(true);
    this.transferError.set(null);

    try {
      const transferRequest: CreateTransactionRequest = {
        sourceAccountId: this.sourceAccountId()!,
        targetAccountId: this.targetAccountId() || undefined,
        transactionType: this.transactionType(),
        amount: this.amount(),
        description: this.description() || undefined,
        reference: this.reference() || undefined,
      };

      const completedTransfer = await this.transactionService
        .create(transferRequest)
        .toPromise();

      if (completedTransfer) {
        this.transferCompleted.emit(completedTransfer);

        this.resetForm();
      }
    } catch (error) {
      console.error('Error making transfer:', error);
      this.transferError.set(
        'Error al realizar la transferencia. Por favor, inténtalo de nuevo.'
      );
    } finally {
      this.isTransferring.set(false);
    }
  }

  // Función para generar una referencia automática
  generateReference(): string {
    const prefix = this.transactionType().substring(0, 3);
    const timestamp = Date.now().toString().slice(-6);
    return `${prefix}-${timestamp}`;
  }

  // Función para limpiar el formulario
  private resetForm(): void {
    this.sourceAccountId.set(null);
    this.targetAccountId.set(null);
    this.transactionType.set('TRANSFER');
    this.amount.set(0);
    this.description.set('');
    this.reference.set('');
    this.selectedBeneficiary.set('');
    this.filteredBeneficiaries.set(this.beneficiaries());
  }

  // Función para seleccionar un beneficiario y establecer la cuenta destino
  selectBeneficiaryForTransfer(beneficiary: BeneficiaryTableResponse): void {
    this.selectedBeneficiary.set(this.getBeneficiaryDisplayText(beneficiary));
    this.targetAccountId.set(beneficiary.accountId);
    this.filteredBeneficiaries.set([beneficiary]);
  }

  // Función para filtrar beneficiarios basado en el texto de búsqueda
  onSearchBeneficiary(searchTerm: string): void {
    this.selectedBeneficiary.set(searchTerm);

    if (!searchTerm.trim()) {
      this.filteredBeneficiaries.set(this.beneficiaries());
      return;
    }

    const filtered = this.beneficiaries().filter(
      (beneficiary) =>
        beneficiary.alias?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        beneficiary.description
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        beneficiary.accountNumber
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        beneficiary.userEmail?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    this.filteredBeneficiaries.set(filtered);
  }

  // Función para obtener el texto de display del beneficiario
  getBeneficiaryDisplayText(beneficiary: BeneficiaryTableResponse): string {
    return `${beneficiary.alias || 'Sin alias'} - ${
      beneficiary.accountNumber
    } (${beneficiary.accountType})`;
  }

  // Función para seleccionar un beneficiario de la lista
  selectBeneficiary(beneficiary: BeneficiaryTableResponse): void {
    this.selectBeneficiaryForTransfer(beneficiary);
  }

  // Función para limpiar la búsqueda
  clearSearch(): void {
    this.selectedBeneficiary.set('');
    this.filteredBeneficiaries.set(this.beneficiaries());
  }
}
