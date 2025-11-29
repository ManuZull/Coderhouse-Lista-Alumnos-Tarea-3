import { Injectable } from '@angular/core';
import { Course } from './model/Course';
import { mockCourses } from './data/mock';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  // Comienzo el mock de cursos de Angular.
  private courses: Course[] = mockCourses.slice();
  private courseSubject = new BehaviorSubject<Course[]>([]);
  courses$ = this.courseSubject.asObservable();

  constructor() {
    this.courseSubject.next(this.courses);
  }

  getCourses() {
    this.courseSubject.next(this.courses);
  }

  getCourse(id: number) {
    return of(this.courses.find((course) => course.id === id));
  }

  addCourse(course: Course) {
    const newId = this.courses.length > 0 ? Math.max(...this.courses.map(c => c.id)) + 1 : 1;
    course.id = newId;
    // ensure dates are stored as Date objects
    course.beginDate = course.beginDate ? new Date(course.beginDate) : course.beginDate;
    course.endDate = course.endDate ? new Date(course.endDate) : course.endDate;
    this.courses.push(course);
    this.courseSubject.next([...this.courses]);
  }

  updateCourse(course: Course) {
    course.beginDate = course.beginDate ? new Date(course.beginDate) : course.beginDate;
    course.endDate = course.endDate ? new Date(course.endDate) : course.endDate;
    const updatedCourses = this.courses.map((c) => (c.id === course.id ? course : c));
    this.courseSubject.next(updatedCourses);
    this.courses = updatedCourses;
  }

  deleteCourse(id: number) {
    const updatedCourses = this.courses.filter((c) => c.id !== id);
    this.courseSubject.next(updatedCourses);
    this.courses = updatedCourses;
  }
}
