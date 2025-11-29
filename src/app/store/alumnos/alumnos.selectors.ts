import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { AlumnoState } from './alumno.model';

export const selectAlumnosState = (state: AppState) => state.alumnos;

export const selectAllAlumnos = createSelector(
  selectAlumnosState,
  (state: AlumnoState) => state.alumnos
);

export const selectAlumnoLoading = createSelector(
  selectAlumnosState,
  (state: AlumnoState) => state.loading
);

export const selectAlumnoError = createSelector(
  selectAlumnosState,
  (state: AlumnoState) => state.error
);

export const selectAlumnoSeleccionado = createSelector(
  selectAlumnosState,
  (state: AlumnoState) => state.selectedAlumno
);

export const selectAlumnoById = (id: number) => createSelector(
  selectAllAlumnos,
  (alumnos) => alumnos.find(alumno => alumno.id === id)
);
