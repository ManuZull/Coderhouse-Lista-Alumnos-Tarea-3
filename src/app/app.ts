import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
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

//Admin usuarios
import { AdminUsers } from './featured/admin/admin-users';
import { Inscripciones } from './featured/inscripciones/inscripciones';
import { CoursesService } from './core/services/courses/courses';





export class ButtonOverviewExample {}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgIf, RouterOutlet, Navbar, Footer, ListaAlumnos, AbmAlumnos, Login, CoursesForm, CoursesTable, AdminUsers, Inscripciones],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('Alumnos');
  alumnos: {nombre: string, apellido: string, email: string}[] = [];


  isAuthenticated = signal(false);

  currentUser = signal<{id: string; username: string; email: string; role: string} | null>(null);
  selectedView = signal<'alumnos' | 'cursos' | 'inscripciones' | 'usuarios'>('alumnos');
  selectedCourse: Course | null = null;
  coursesList: { id: string; title: string }[] = [];

  constructor(private coursesService: CoursesService) {
    this.coursesService.courses$.subscribe((cs: Course[]) => {
      this.coursesList = cs.map(c => ({ id: String(c.id), title: c.title }));
    });
    this.coursesService.getCourses();
  }

  isAdmin() {
    return !!this.currentUser() && this.currentUser()!.role === 'ADMIN';
  }

  currentRole() {
    return this.currentUser() ? this.currentUser()!.role : null;
  }

  agregarAlumno(alumno: {nombre: string, apellido: string, email: string}) {
    this.alumnos.push(alumno);
  }

  onLogin(user?: any) {
    
    if (!user) {
      
      alert('Error. Usted no esta registrado.');
      return;
    }
    this.currentUser.set({ id: user.id, username: user.username, email: user.email, role: user.role });
    this.isAuthenticated.set(true);
  }

  onLogout() {
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.selectedView.set('alumnos');
  }

  select(view: 'alumnos' | 'cursos' | 'inscripciones' | 'usuarios') {
    this.selectedView.set(view);
  }

  onCourseEdit(course: Course) {
    console.log('App received course to edit:', course);
    this.selectedCourse = { ...course };
  }

  onDeleteAlumno(index: number) {
    if (!this.isAdmin()) {
      alert('Solo los administradores pueden borrar estudiantes');
      return;
    }
    this.alumnos.splice(index, 1);
  }

  onEditAlumno(index: number) {
    if (!this.isAdmin()) {
      alert('Sólo administradores pueden editar alumnos');
      return;
    }
    const a = this.alumnos[index];
    const nombre = prompt('Nombre:', a.nombre) || a.nombre;
    const apellido = prompt('Apellido:', a.apellido) || a.apellido;
    const email = prompt('Email:', a.email) || a.email;
    this.alumnos[index] = { nombre, apellido, email };
  }
}
