import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-alumnos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-alumnos.html',
  styleUrls: ['./lista-alumnos.css']
})
export class ListaAlumnos {
  @Input() alumnos: {nombre: string, apellido: string, email: string}[] = [];
  @Input() canManage = false;
  @Output() deleteAlumno = new EventEmitter<number>();
  @Output() editAlumno = new EventEmitter<number>();
}
