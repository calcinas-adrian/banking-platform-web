import { Component, inject, OnInit, signal } from '@angular/core';
import { SaveBeneficiaryRequest } from '../../../models/dto.request/save-beneficiary.request';
import { BeneficiaryService } from '../../../service/beneficiary.service';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../../service/account.service';

@Component({
  selector: 'app-beneficiary-edit',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './beneficiary-edit.component.html',
})
export default class BeneficiaryEditComponent implements OnInit {
  private router = inject(Router);
  private beneficiaryService = inject(BeneficiaryService);
  private accountService = inject(AccountService);
  private formBuilder = inject(FormBuilder);

  protected id = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => +params['id'])),
    { initialValue: 0 }
  );
  protected accounts = toSignal(this.accountService.getAll(), {
    initialValue: [],
  });

  isLoading = signal(false);
  error = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  beneficiaryForm: FormGroup = this.formBuilder.group({
    accountNumber: ['', [Validators.required]],
    alias: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    description: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(200)],
    ],
  });

  ngOnInit(): void {
    if (!this.id()) {
      this.error.set('Error: Usuario no identificado');
      return;
    }
  }

  saveBeneficiary(): void {
    if (this.beneficiaryForm.invalid) {
      this.beneficiaryForm.markAllAsTouched();
      this.error.set(
        'Por favor, complete todos los campos requeridos correctamente'
      );
      return;
    }

    if (!this.id()) {
      this.error.set('Error: Usuario no identificado');
      return;
    }

    // Buscar el account ID basado en el número de cuenta seleccionado
    const selectedAccountNumber = this.beneficiaryForm.value.accountNumber;
    const selectedAccount = this.accounts().find(
      (account) => account.accountNumber === selectedAccountNumber
    );

    if (!selectedAccount || !selectedAccount.id) {
      this.error.set(
        'Número de cuenta no válido. Por favor, seleccione una cuenta de la lista.'
      );
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);
    this.successMessage.set(null);

    const beneficiaryData: SaveBeneficiaryRequest = {
      userId: this.id(),
      accountId: selectedAccount.id,
      alias: this.beneficiaryForm.value.alias,
      description: this.beneficiaryForm.value.description,
    };

    this.beneficiaryService.saveBeneficiary(beneficiaryData).subscribe({
      next: (response) => {
        this.successMessage.set('Beneficiario guardado exitosamente');
        setTimeout(() => {
          this.router.navigate(['/beneficiaries/list']);
        }, 2000);
      },
      error: (error) => {
        console.error('Error creating beneficiary:', error);
        this.error.set(
          error.error.message ||
            'Error al guardar el beneficiario. Inténtelo de nuevo más tarde.'
        );
        this.isLoading.set(false);
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/beneficiaries/list']);
  }

  // Métodos auxiliares para el template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.beneficiaryForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.beneficiaryForm.get(fieldName);
    if (field && field.errors && (field.dirty || field.touched)) {
      if (field.errors['required']) return `${fieldName} es requerido`;
      if (field.errors['minlength'])
        return `${fieldName} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
      if (field.errors['maxlength'])
        return `${fieldName} no puede exceder ${field.errors['maxlength'].requiredLength} caracteres`;
      if (field.errors['min'])
        return `${fieldName} debe ser mayor a ${field.errors['min'].min}`;
    }
    return '';
  }

  // Método para obtener información adicional de la cuenta seleccionada
  getSelectedAccountInfo(): any {
    const selectedAccountNumber = this.beneficiaryForm.value.accountNumber;
    if (!selectedAccountNumber) return null;

    return this.accounts().find(
      (account) => account.accountNumber === selectedAccountNumber
    );
  }

  // Filtrar solo cuentas activas para el datalist
  get activeAccounts() {
    return this.accounts().filter((account) => account.status === 'ACTIVE');
  }
}
