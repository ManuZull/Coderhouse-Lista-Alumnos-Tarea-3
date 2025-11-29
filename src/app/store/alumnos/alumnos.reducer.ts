import { createReducer, on } from '@ngrx/store';
import { Alumno, AlumnoState } from './alumno.model';
import * as AlumnosActions from './alumnos.actions';

export const initialState: AlumnoState = {
  alumnos: [],
  loading: false,
  error: null,
  selectedAlumno: null
};

export const alumnosReducer = createReducer(
  initialState,
  on(AlumnosActions.cargarAlumnos, state => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(AlumnosActions.cargarAlumnosSuccess, (state, { alumnos }) => ({
    ...state,
    loading: false,
    alumnos: [...alumnos],
    error: null
  })),
  
  on(AlumnosActions.cargarAlumnosError, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),
  
  on(AlumnosActions.agregarAlumnoSuccess, (state, { alumno }) => ({
    ...state,
    alumnos: [...state.alumnos, alumno],
    error: null
  })),
  
  on(AlumnosActions.actualizarAlumnoSuccess, (state, { alumno }) => ({
    ...state,
    alumnos: state.alumnos.map(a => a.id === alumno.id ? alumno : a),
    selectedAlumno: state.selectedAlumno?.id === alumno.id ? alumno : state.selectedAlumno,
    error: null
  })),
  
  on(AlumnosActions.eliminarAlumnoSuccess, (state, { id }) => ({
    ...state,
    alumnos: state.alumnos.filter(a => a.id !== id),
    selectedAlumno: state.selectedAlumno?.id === id ? null : state.selectedAlumno,
    error: null
  })),
  
  on(AlumnosActions.seleccionarAlumno, (state, { id }) => ({
    ...state,
    selectedAlumno: state.alumnos.find(a => a.id === id) || null
  })),
  
  on(AlumnosActions.limpiarAlumnoSeleccionado, state => ({
    ...state,
    selectedAlumno: null
  }))
);
