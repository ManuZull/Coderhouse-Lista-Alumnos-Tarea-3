import { Injectable, signal } from '@angular/core';
export interface Alumno {
  nombre: string;
  apellido: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private _alumnos = signal<Alumno[]>([]);
  alumnos = this._alumnos.asReadonly();

  agregarAlumno(alumno: Alumno) {
    this._alumnos.update(list => [...list, alumno]);
  }

  eliminarAlumno(index: number) {
    this._alumnos.update(list => list.filter((_, i) => i !== index));
  }

  actualizarAlumno(index: number, alumno: Alumno) {
    this._alumnos.update(list => {
      const newList = [...list];
      newList[index] = alumno;
      return newList;
    });
  }
}

