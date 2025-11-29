export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: Date;
  activo: boolean;
}

export interface AlumnoState {
  alumnos: Alumno[];
  loading: boolean;
  error: string | null;
  selectedAlumno: Alumno | null;
}
