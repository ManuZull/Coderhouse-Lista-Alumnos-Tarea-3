import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Alumno } from './alumno.model';
import * as AlumnosActions from './alumnos.actions';


@Injectable()
export class AlumnosEffects {
  private apiUrl = 'api/alumnos'; // URL de la API real

  // simulacion al tipo servicio HTTP
  private alumnos: Alumno[] = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'juan@example.com', fechaNacimiento: new Date('2000-01-01'), activo: true },
    { id: 2, nombre: 'María', apellido: 'González', email: 'maria@example.com', fechaNacimiento: new Date('2001-05-15'), activo: true },
  ];

  cargarAlumnos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlumnosActions.cargarAlumnos),
      mergeMap(() =>

        of(this.alumnos).pipe(
          map(alumnos => AlumnosActions.cargarAlumnosSuccess({ alumnos })),
          catchError(error => of(AlumnosActions.cargarAlumnosError({ error: 'Error al cargar los alumnos' })))
        )
      )
    )
  );

  agregarAlumno$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlumnosActions.agregarAlumno),
      mergeMap(({ alumno }) => {
        const nuevoAlumno: Alumno = {
          ...alumno,
          id: Math.max(0, ...this.alumnos.map(a => a.id)) + 1
        };

        this.alumnos = [...this.alumnos, nuevoAlumno];
        return of(AlumnosActions.agregarAlumnoSuccess({ alumno: nuevoAlumno }));
      }),
      catchError(error => of(AlumnosActions.cargarAlumnosError({ error: 'Error al agregar el alumno' })))
    )
  );

  actualizarAlumno$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlumnosActions.actualizarAlumno),
      mergeMap(({ alumno }) => {

        this.alumnos = this.alumnos.map(a => a.id === alumno.id ? alumno : a);
        return of(AlumnosActions.actualizarAlumnoSuccess({ alumno }));
      }),
      catchError(error => of(AlumnosActions.cargarAlumnosError({ error: 'Error al actualizar el alumno' })))
    )
  );

  eliminarAlumno$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlumnosActions.eliminarAlumno),
      mergeMap(({ id }) => {

        this.alumnos = this.alumnos.filter(a => a.id !== id);
        return of(AlumnosActions.eliminarAlumnoSuccess({ id }));
      }),
      catchError(error => of(AlumnosActions.cargarAlumnosError({ error: 'Error al eliminar el alumno' })))
    )
  );

  constructor(private actions$: Actions) {}
}
