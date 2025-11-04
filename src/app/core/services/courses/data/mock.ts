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
  
];
