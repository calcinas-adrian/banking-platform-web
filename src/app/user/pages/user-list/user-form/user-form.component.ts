import {
  Component,
  signal,
  output,
  input,
  effect,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { CreateUserRequest } from '../../../../models';
import { UpdateUserRequest } from '../../../../models/dto/update-user-request.dto';
import { UserService } from '../../../../service/user.service';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule, NgClass],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  userCreated = output<CreateUserRequest>();
  userUpdated = output<UpdateUserRequest>();

  // Input para recibir el ID del usuario a editar
  userIdToEdit = input<number | null>(null);

  // Signal para manejar el modo (crear o editar)
  isEditMode = signal<boolean>(false);

  // Signal para almacenar los datos del usuario completo a editar
  editingUser = signal<any>(null);

  private userService = inject(UserService);

  newUser = signal<CreateUserRequest>({
    email: '',
    password: '',
    name: '',
    lastName: '',
    ci: '',
    mobile: '',
    address: '',
    saldoInicial: undefined,
    tipoCuenta: 'SAVINGS',
    moneda: 'BOB',
  });

  hasCreateAccount = signal(false);

  constructor() {
    // Effect para detectar cuando se pasa un ID de usuario para editar
    effect(() => {
      const userId = this.userIdToEdit();
      if (userId) {
        this.isEditMode.set(true);
        this.loadUserForEdit(userId);
      } else {
        this.isEditMode.set(false);
        this.resetForm();
      }
    });
  }
  private loadUserForEdit(userId: number) {
    this.userService.getById(userId).subscribe({
      next: (user) => {
        this.editingUser.set(user);
        this.newUser.set({
          email: user.email,
          password: '', // No mostramos la contraseña
          name: user.profile?.name || '',
          lastName: user.profile?.lastName || '',
          ci: user.profile?.ci || '',
          mobile: user.profile?.mobile || '',
          address: user.profile?.address || '',
          saldoInicial: undefined,
          tipoCuenta: 'SAVINGS',
          moneda: 'BOB',
        });
        this.hasCreateAccount.set(false);
      },
      error: (error) => {
        console.error('Error loading user for edit:', error);
      },
    });
  }

  resetForm() {
    this.newUser.set({
      email: '',
      password: '',
      name: '',
      lastName: '',
      ci: '',
      mobile: '',
      address: '',
      saldoInicial: undefined,
      tipoCuenta: 'SAVINGS',
      moneda: 'BOB',
    });
    this.hasCreateAccount.set(false);
    this.editingUser.set(null);
  }

  handleSubmit() {
    if (this.isEditMode()) {
      // Modo edición
      const editingUserData = this.editingUser();
      if (!editingUserData?.id) return;

      const userToUpdate: UpdateUserRequest = {
        id: editingUserData.id,
        email: this.newUser().email,
        name: this.newUser().name,
        lastName: this.newUser().lastName,
        ci: this.newUser().ci,
      };

      // Agregar campos opcionales solo si tienen valor
      const mobile = this.newUser().mobile;
      if (mobile && mobile.trim() !== '') {
        userToUpdate.mobile = mobile;
      }

      const address = this.newUser().address;
      if (address && address.trim() !== '') {
        userToUpdate.address = address;
      }

      this.userUpdated.emit(userToUpdate);
    } else {
      // Modo creación (código existente)
      const userToCreate: Partial<CreateUserRequest> = {
        // Campos obligatorios siempre incluidos
        email: this.newUser().email,
        password: this.newUser().password,
        name: this.newUser().name,
        lastName: this.newUser().lastName,
        ci: this.newUser().ci,
      };

      // Agregar campos opcionales solo si tienen valor
      const mobile = this.newUser().mobile;
      if (mobile && mobile.trim() !== '') {
        userToCreate.mobile = mobile;
      }

      const address = this.newUser().address;
      if (address && address.trim() !== '') {
        userToCreate.address = address;
      }

      const saldoInicial = this.newUser().saldoInicial;
      if (
        this.hasCreateAccount() &&
        saldoInicial !== undefined &&
        saldoInicial > 0
      ) {
        userToCreate.saldoInicial = saldoInicial;
      }

      const tipoCuenta = this.newUser().tipoCuenta;
      if (this.hasCreateAccount() && tipoCuenta && tipoCuenta.trim() !== '') {
        userToCreate.tipoCuenta = tipoCuenta;
      }

      const moneda = this.newUser().moneda;
      if (this.hasCreateAccount() && moneda && moneda.trim() !== '') {
        userToCreate.moneda = moneda;
      }

      this.userCreated.emit(userToCreate as CreateUserRequest);
    }

    // Limpia el formulario después de emitir
    this.resetForm();
  }

  cancelEdit() {
    this.resetForm();
    this.isEditMode.set(false);
  }
}
