import { AlumnoState } from './alumnos/alumno.model';
import { CursoState } from './cursos/curso.model';

// Interfaces para inscripciones y usuarios (a implementar)
export interface InscripcionState {
  // Por implementar
}

export interface UsuarioState {
  // Por implementar
}

export interface AppState {
  alumnos: AlumnoState;
  cursos: CursoState;
  inscripciones: InscripcionState;
  usuarios: UsuarioState;
}
