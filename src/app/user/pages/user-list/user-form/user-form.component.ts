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
    gender: '',
    birthDate: '',
    saldo: 0.0,
    type: '',
  });
  hasCreateAccount = signal(false);

  handleSubmit() {
    // Solo emite los datos del usuario, no maneja la creación
    this.userCreated.emit(this.newUser());

    // Limpia el formulario después de emitir
    this.newUser.set({
      email: '',
      password: '',
      name: '',
      lastName: '',
      gender: '',
      birthDate: '',
      saldo: 0.0,
      type: '',
    });
  }
}
