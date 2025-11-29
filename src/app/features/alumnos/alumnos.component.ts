import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbmAlumnos } from './abm-alumnos/abm-alumnos';
import { ListaAlumnos } from './lista-alumnos/lista-alumnos';
import { AlumnosService } from '../../core/services/alumnos/alumnos.service';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [CommonModule, AbmAlumnos, ListaAlumnos],
  template: `
    <div class="alumnos-container">
      <h2>Gestión de Alumnos</h2>
      <app-abm-alumnos *ngIf="authService.isAdmin()" (alumnoAgregado)="agregarAlumno($event)"></app-abm-alumnos>
      <app-lista-alumnos
        [alumnos]="alumnosService.alumnos()"
        [canManage]="authService.isAdmin()"
        (deleteAlumno)="onDeleteAlumno($event)"
        (editAlumno)="onEditAlumno($event)">
      </app-lista-alumnos>
    </div>
  `,
  styles: [`
    .alumnos-container {
      padding: 1rem;
    }
    h2 {
      margin-bottom: 1rem;
    }
  `]
})
export class AlumnosComponent {
  constructor(
    public alumnosService: AlumnosService,
    public authService: AuthService
  ) {}

  agregarAlumno(alumno: {nombre: string, apellido: string, email: string}) {
    this.alumnosService.agregarAlumno(alumno);
  }

  onDeleteAlumno(index: number) {
    if (!this.authService.isAdmin()) {
      alert('Solo los administradores pueden borrar estudiantes');
      return;
    }
    this.alumnosService.eliminarAlumno(index);
  }

  onEditAlumno(index: number) {
    if (!this.authService.isAdmin()) {
      alert('Sólo administradores pueden editar alumnos');
      return;
    }
    const alumnos = this.alumnosService.alumnos();
    const a = alumnos[index];
    const nombre = prompt('Nombre:', a.nombre) || a.nombre;
    const apellido = prompt('Apellido:', a.apellido) || a.apellido;
    const email = prompt('Email:', a.email) || a.email;
    this.alumnosService.actualizarAlumno(index, { nombre, apellido, email });
  }
}

