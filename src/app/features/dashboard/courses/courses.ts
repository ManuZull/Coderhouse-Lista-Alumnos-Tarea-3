import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesForm } from './courses-form/courses-form';
import { CoursesTable } from './courses-table/courses-table';
import { Course } from '../../../core/services/courses/model/Course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.html',
  styleUrls: ['./courses.css'],
  standalone: true,
  imports: [CommonModule, CoursesForm, CoursesTable]
})
export class CoursesComponent {
  selectedCourse: Course | null = null;

  constructor() {}

  handleEditCourse(course: Course) {
    console.log('Course to edit:', course);
    this.selectedCourse = { ...course };
    console.log('Selected course in parent:', this.selectedCourse);
  }
}