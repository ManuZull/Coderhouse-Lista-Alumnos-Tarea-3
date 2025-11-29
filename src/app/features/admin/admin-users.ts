import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule, MatProgressSpinnerModule],
  styleUrls: ['./admin-users.css'],
  template: `
  <div class="admin-users">
    <div class="spinner-overlay" *ngIf="loading()">
      <mat-progress-spinner mode="indeterminate" diameter="50"></mat-progress-spinner>
    </div>
    <h3>Gestión de Usuarios (Admin)</h3>
    <table>
      <thead><tr><th>Id</th><th>Usuario</th><th>Email</th><th>Rol</th><th>Acciones</th></tr></thead>
      <tbody>
        <tr *ngFor="let u of users">
          <td>{{u.id}}</td>
          <td>{{u.username}}</td>
          <td>{{u.email}}</td>
          <td>{{u.role}}</td>
            <td>
              <div class="actions">
                <button class="edit btn" (click)="editUser(u)">Editar</button>
                <button class="delete btn btn-danger" (click)="deleteUser(u.id)">Borrar</button>
              </div>
            </td>
        </tr>
      </tbody>
    </table>

    <div class="form">
      <h4 *ngIf="!editing">Crear usuario</h4>
      <h4 *ngIf="editing">Editar usuario</h4>
      <label>Usuario:
        <input class="material-input" type="text" placeholder="Nombre de usuario" [(ngModel)]="model.username" />
      </label>
      <label>Email:
        <input class="material-input" type="email" placeholder="usuario@ejemplo.com" [(ngModel)]="model.email" />
      </label>
      <label>Password:
        <input class="material-input" type="password" placeholder="Contraseña" [(ngModel)]="model.password" />
      </label>
      <label>Rol:
        <select class="material-select" [(ngModel)]="model.role">
          <option value="ADMIN">ADMIN</option>
          <option value="USER">USER</option>
        </select>
      </label>
      <div>
        <button class="btn btn-primary" (click)="save()">Guardar</button>
        <button class="btn btn-ghost" (click)="cancel()">Cancelar</button>
      </div>
    </div>
  </div>
  `
})
export class AdminUsers implements OnInit {
  loading = signal(true);
  users: User[] = [
    { id: '1', username: 'admin', email: 'admin@gmail.com', password: 'admin1234', role: 'ADMIN' },
    { id: '2', username: 'user', email: 'manuzullo@gmail.com', password: '1234', role: 'USER' },
    { id: '3', username: 'user2', email: 'user2@gmail.com', password: '1234', role: 'USER' }
  ];

  model: User = { id: '', username: '', email: '', password: '', role: 'USER' };
  editing = false;

  ngOnInit(): void {
    // Simular carga inicial
    setTimeout(() => this.loading.set(false), 600);
  }

  private nextId() {
    const max = this.users.reduce((m, u) => Math.max(m, Number(u.id)), 0);
    return String(max + 1);
  }

  save() {
    if (!this.model.username || !this.model.email) return;
    if (this.editing) {
      const idx = this.users.findIndex(u => u.id === this.model.id);
      if (idx >= 0) this.users[idx] = { ...this.model };
    } else {
      this.model.id = this.nextId();
      this.users.push({ ...this.model });
    }
    this.cancel();
  }

  editUser(u: User) {
    this.editing = true;
    this.model = { ...u };
  }

  deleteUser(id: string) {
    this.users = this.users.filter(u => u.id !== id);
  }

  cancel() {
    this.editing = false;
    this.model = { id: '', username: '', email: '', password: '', role: 'USER' };
  }
}
