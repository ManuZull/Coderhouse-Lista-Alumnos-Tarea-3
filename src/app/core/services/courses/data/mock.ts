import { Course, CourseStatus } from '../model/Course';

//Dato mockeado para cursos. 
export const mockCourses: Course[] = [
  {
    id: 1,
    title: 'Angular',
    description:
      'En este curso aprenderás a construir aplicaciones web con Angular.',
    beginDate: new Date('2025-11-01'),
    endDate: new Date('2025-12-31'),
    status: CourseStatus.SCHEDULED,
  },
  {
    id: 2,
    title: 'Golang',
    description:
      'Curso intensivo de 90 horas, se aprende los elementos basicos hasta los avanzados.',
    beginDate: new Date('2026-14-01'),
    endDate: new Date('2026-14-03'),
    status: CourseStatus.SCHEDULED,
  },
];
