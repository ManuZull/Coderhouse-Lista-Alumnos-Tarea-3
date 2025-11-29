import { Component, Input } from '@angular/core';
import { CommonModule, NgIf, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface Course {
  id: string;
  title: string;
}

@Component({
  selector: 'app-inscripciones',
  standalone: true,
  imports: [CommonModule, NgIf, NgForOf, FormsModule],
  styleUrls: ['./inscripciones.css'],
  template: `
  <div class="inscripciones">
    <h3>Inscripciones</h3>
    <p *ngIf="!currentUser">Inicia sesión para ver o administrar inscripciones.</p>

    <div *ngIf="currentUser">
      <h4>Inscripciones actuales</h4>
      <table>
        <thead><tr><th>Alumno</th><th>Curso</th><th>Acciones</th></tr></thead>
        <tbody>
          <tr *ngFor="let e of enrollments; let i = index">
            <td>{{e.student}}</td>
            <td>{{e.courseTitle}}</td>
            <td>
              <div class="actions">
                <button class="delete btn btn-danger" (click)="remove(i)">Eliminar</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <h4>Agregar Inscripción</h4>
      <label>Alumno:
        <input class="material-input" [(ngModel)]="newStudent" placeholder="Nombre o email" />
      </label>
      <label>Curso:
        <select class="material-select" [(ngModel)]="newCourseId">
          <option *ngFor="let c of courses" [value]="c.id">{{c.title}}</option>
        </select>
      </label>
      <div>
        <button class="btn btn-primary" (click)="add()">Agregar</button>
      </div>
    </div>
  </div>
  `
})
export class Inscripciones {
  @Input() currentUser: User | null = null;
  @Input() courses: Course[] = [];

  enrollments: { student: string; courseId: string; courseTitle: string }[] = [];
  newStudent = '';
  newCourseId = '';

  add() {
    if (!this.newStudent || !this.newCourseId) return;
    const c = this.courses.find(x => x.id === this.newCourseId as any);
    const title = c ? c.title : 'Desconocido';
    this.enrollments.push({ student: this.newStudent, courseId: this.newCourseId, courseTitle: title });
    this.newStudent = '';
    this.newCourseId = '';
  }

  remove(index: number) {
    this.enrollments.splice(index, 1);
  }
}
