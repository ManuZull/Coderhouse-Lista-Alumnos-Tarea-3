export interface Curso {
  id: number;
  nombre: string;
  descripcion: string;
  duracionHoras: number;
  activo: boolean;
}

export interface CursoState {
  cursos: Curso[];
  loading: boolean;
  error: string | null;
  selectedCurso: Curso | null;
}
