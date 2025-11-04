import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';

//Alumnos
import { ListaAlumnos } from './lista-alumnos/lista-alumnos';
import { AbmAlumnos } from './abm-alumnos/abm-alumnos';

//Login y cursos 
import { Login } from './featured/auth/login/login';
import { CoursesForm } from './featured/dashboard/courses/courses-form/courses-form';
import { CoursesTable } from './featured/dashboard/courses/courses-table/courses-table';
import { Course } from './core/services/courses/model/Course';





export class ButtonOverviewExample {}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Navbar, Footer, ListaAlumnos, AbmAlumnos, Login, CoursesForm, CoursesTable],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('Alumnos');
  alumnos: {nombre: string, apellido: string, email: string}[] = [];

  // auth state
  isAuthenticated = signal(false);
  selectedView = signal<'alumnos' | 'cursos' | 'inscripciones'>('alumnos');
  selectedCourse: Course | null = null;

  agregarAlumno(alumno: {nombre: string, apellido: string, email: string}) {
    this.alumnos.push(alumno);
  }

  onLogin() {
    this.isAuthenticated.set(true);
  }

  onLogout() {
    this.isAuthenticated.set(false);
    this.selectedView.set('alumnos');
  }

  select(view: 'alumnos' | 'cursos' | 'inscripciones') {
    this.selectedView.set(view);
  }

  onCourseEdit(course: Course) {
    console.log('App received course to edit:', course);
    this.selectedCourse = { ...course };
  }
}
