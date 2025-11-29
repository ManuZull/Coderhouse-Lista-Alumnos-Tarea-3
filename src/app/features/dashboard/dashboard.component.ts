import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesTable } from './courses/courses-table/courses-table';
import { CoursesForm } from './courses/courses-form/courses-form';
import { Course } from '../../core/services/courses/model/Course';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CoursesTable, CoursesForm],
  template: `
    <div class="dashboard-container">
      <h2>Gestión de Cursos</h2>
      <div class="courses-abm">
        <div class="left-panel">
          <app-courses-table
            (editCourse)="onCourseEdit($event)"
            [currentRole]="authService.getCurrentRole()">
          </app-courses-table>
        </div>
        <div class="right-panel">
          <app-courses-form
            *ngIf="authService.isAdmin()"
            [courseToEdit]="selectedCourse()">
          </app-courses-form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 1rem;
    }
    h2 {
      margin-bottom: 1rem;
    }
    .courses-abm {
      display: flex;
      gap: 1rem;
    }
    .courses-abm .left-panel {
      flex: 1;
    }
    .courses-abm .right-panel {
      width: 420px;
    }
  `]
})
export class DashboardComponent {
  selectedCourse = signal<Course | null>(null);

  constructor(public authService: AuthService) {}

  onCourseEdit(course: Course) {
    this.selectedCourse.set({ ...course });
  }
}

