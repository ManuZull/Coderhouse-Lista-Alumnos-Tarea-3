import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Inscripciones } from './inscripciones';
import { AuthService } from '../../core/services/auth/auth.service';
import { CoursesService } from '../../core/services/courses/courses';
import { Course } from '../../core/services/courses/model/Course';

@Component({
  selector: 'app-inscripciones-feature',
  standalone: true,
  imports: [CommonModule, Inscripciones],
  template: `
    <div class="inscripciones-container">
      <app-inscripciones
        [currentUser]="authService.currentUser()"
        [courses]="coursesList()">
      </app-inscripciones>
    </div>
  `,
  styles: [`
    .inscripciones-container {
      padding: 1rem;
    }
  `]
})
export class InscripcionesComponent implements OnInit {
  coursesList = signal<{ id: string; title: string }[]>([]);

  constructor(
    public authService: AuthService,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this.coursesService.courses$.subscribe((cs: Course[]) => {
      this.coursesList.set(cs.map(c => ({ id: String(c.id), title: c.title })));
    });
    this.coursesService.getCourses();
  }
}

