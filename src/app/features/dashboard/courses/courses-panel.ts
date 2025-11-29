import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableDataSource } from '@angular/material/table';
import { CoursesService } from '../../../core/services/courses/courses';
import { Course, courseColumns } from '../../../core/services/courses/model/Course';

@Component({
  selector: 'app-courses-panel',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCardModule,
    MatTooltipModule,
  ],
  templateUrl: './courses-panel.html',
  styleUrls: ['./courses-panel.css'],
})
export class CoursesPanel implements OnInit {
  displayedColumns: string[] = [...courseColumns, 'actions'];
  dataSource = new MatTableDataSource<Course>([]);
  isEditing = false;
  editingId: number | null = null;

  form: any;

  constructor(private fb: FormBuilder, private courseService: CoursesService) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      beginDate: [null, Validators.required],
      endDate: [null, Validators.required],
      status: ['SCHEDULED', Validators.required],
    });

    this.courseService.courses$.subscribe((courses: Course[]) => {
      this.dataSource.data = courses;
    });
  }

  ngOnInit(): void {
    this.courseService.getCourses();
  }

  startCreate() {
    this.isEditing = false;
    this.editingId = null;
    this.form.reset({ status: 'SCHEDULED' });
  }

  startEdit(course: Course) {
    this.isEditing = true;
    this.editingId = course.id;
    this.form.patchValue({
      title: course.title,
      description: course.description,
      beginDate: new Date(course.beginDate),
      endDate: new Date(course.endDate),
      status: course.status,
    });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: any = {
      ...this.form.value,
    };

  
    if (payload.beginDate instanceof Date) payload.beginDate = payload.beginDate.toISOString();
    if (payload.endDate instanceof Date) payload.endDate = payload.endDate.toISOString();

    if (this.isEditing && this.editingId != null) {
      payload.id = this.editingId;
      this.courseService.updateCourse(payload as Course);
    } else {
      this.courseService.addCourse(payload as Course);
    }

    this.startCreate();
  }

  remove(id: number) {
    this.courseService.deleteCourse(id);
  }
}
