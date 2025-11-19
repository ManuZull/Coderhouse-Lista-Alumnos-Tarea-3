import { Component, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Course, courseColumns } from '../../../../core/services/courses/model/Course';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CoursesService } from '../../../../core/services/courses/courses';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-courses-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './courses-table.html',
  styleUrls: ['./courses-table.css'],
})
export class CoursesTable {
  displayedColumns: string[] = courseColumns;
  dataSource = new MatTableDataSource<Course>([]);
  @Input() currentRole: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output() editCourse = new EventEmitter<Course>();

  constructor(private courseService: CoursesService) {
    this.courseService.courses$.subscribe((courses: Course[]) => {
      this.dataSource.data = courses;
    });
  }

  ngOnInit() {
    this.courseService.getCourses();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onDeleteCourse(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este curso?')) {
      this.courseService.deleteCourse(id);
    }
  }

  onEditCourse(id: number) {
    console.log('Finding course with id:', id);
    const courseToEdit = this.dataSource.data.find(course => course.id === id);
    console.log('Course found:', courseToEdit);
    if (courseToEdit) {
      this.editCourse.emit(courseToEdit);
    }
  }
}
