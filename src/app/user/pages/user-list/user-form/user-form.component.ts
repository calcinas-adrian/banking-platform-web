import { Component, signal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateUserRequest } from '../../../../models';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  userCreated = output<CreateUserRequest>();

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
  handleSubmit() {
    // Crear objeto solo con campos que tienen valor
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
    if (this.hasCreateAccount() && saldoInicial !== undefined && saldoInicial > 0) {
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

    // Emite los datos del usuario
    this.userCreated.emit(userToCreate as CreateUserRequest);

    // Limpia el formulario después de emitir
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
  }
}
