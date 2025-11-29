import { Component, signal, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
 
  @Output() loggedIn = new EventEmitter<User | null>();

  protected readonly brandColor = '#1e6cd3';
  protected readonly submitting = signal(false);

  form = new FormBuilder().group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);

    // Usuarios que se pueden inisiar sesion
    const users: User[] = [
      { id: '1', username: 'admin', email: 'admin@gmail.com', password: 'admin1234', role: 'ADMIN' },
      { id: '2', username: 'user', email: 'manuzullo@gmail.com', password: '1234', role: 'USER' },
      { id: '3', username: 'user2', email: 'user2@gmail.com', password: '1234', role: 'USER' }
    ];

    setTimeout(() => {
      this.submitting.set(false);
      const val = this.form.value as {email: string; password: string};
      const found = users.find(u => (u.email === val.email || u.username === val.email) && u.password === val.password) || null;
      if (!found) {        
        console.warn('Credenciales inválidas', val);
        this.loggedIn.emit(null);
        return;
      }
      
      this.loggedIn.emit(found);
    }, 600);
  }
}
