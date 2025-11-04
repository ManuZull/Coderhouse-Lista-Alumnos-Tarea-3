import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  @Output() alumnoAgregado = new EventEmitter<{nombre: string, apellido: string, email: string}>();
  @Output() logout = new EventEmitter<void>();

  agregarAlumno() {
    if (this.nombre && this.apellido && this.email) {
      this.alumnoAgregado.emit({nombre: this.nombre, apellido: this.apellido, email: this.email});
      this.nombre = '';
      this.apellido = '';
      this.email = '';
    }
  }
}
