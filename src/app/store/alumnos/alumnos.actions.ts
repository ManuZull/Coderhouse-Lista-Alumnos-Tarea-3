import { createAction, props } from '@ngrx/store';
import { Alumno } from './alumno.model';

export const cargarAlumnos = createAction('[Alumnos] Cargar Alumnos');

export const cargarAlumnosSuccess = createAction(
  '[Alumnos] Cargar Alumnos Success',
  props<{ alumnos: Alumno[] }>()
);

export const cargarAlumnosError = createAction(
  '[Alumnos] Cargar Alumnos Error',
  props<{ error: string }>()
);

export const agregarAlumno = createAction(
  '[Alumnos] Agregar Alumno',
  props<{ alumno: Omit<Alumno, 'id'> }>()
);

export const agregarAlumnoSuccess = createAction(
  '[Alumnos] Agregar Alumno Success',
  props<{ alumno: Alumno }>()
);

export const actualizarAlumno = createAction(
  '[Alumnos] Actualizar Alumno',
  props<{ alumno: Alumno }>()
);

export const actualizarAlumnoSuccess = createAction(
  '[Alumnos] Actualizar Alumno Success',
  props<{ alumno: Alumno }>()
);

export const eliminarAlumno = createAction(
  '[Alumnos] Eliminar Alumno',
  props<{ id: number }>()
);

export const eliminarAlumnoSuccess = createAction(
  '[Alumnos] Eliminar Alumno Success',
  props<{ id: number }>()
);

export const seleccionarAlumno = createAction(
  '[Alumnos] Seleccionar Alumno',
  props<{ id: number }>()
);

export const limpiarAlumnoSeleccionado = createAction(
  '[Alumnos] Limpiar Alumno Seleccionado'
);
