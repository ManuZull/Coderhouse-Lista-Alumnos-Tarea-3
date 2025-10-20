import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';

import { ListaAlumnos } from './lista-alumnos/lista-alumnos';
import { AbmAlumnos } from './abm-alumnos/abm-alumnos';





export class ButtonOverviewExample {}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer, ListaAlumnos, AbmAlumnos],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('Alumnos');
  alumnos: {nombre: string, apellido: string, email: string}[] = [];

  agregarAlumno(alumno: {nombre: string, apellido: string, email: string}) {
    this.alumnos.push(alumno);
  }
}
