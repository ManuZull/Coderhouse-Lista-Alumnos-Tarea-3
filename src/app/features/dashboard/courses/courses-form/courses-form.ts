import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

//Cursos y otros
import { Course } from '../../../../core/services/courses/model/Course';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CoursesService } from '../../../../core/services/courses/courses';

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.html',
  styleUrls: ['./courses-form.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ]
})
export class CoursesForm implements OnChanges {
  @Input() courseToEdit: Course | null = null;
  createForm: FormGroup;
  courseId: number | null = null;
  isEditing: boolean = false;
  formTitle: string = 'Crear Curso';

  constructor(
    private fb: FormBuilder,
    private courseService: CoursesService
  ) {
    this.createForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      beginDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      status: ['SCHEDULED', [Validators.required]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['courseToEdit'] && changes['courseToEdit'].currentValue) {
      const course = changes['courseToEdit'].currentValue as Course;
      console.log('Editing course:', course);
      
      this.courseId = course.id;
      this.isEditing = true;
      this.formTitle = 'Editar Curso';

    
      const beginDate = course.beginDate ? new Date(course.beginDate).toISOString().split('T')[0] : '';
      const endDate = course.endDate ? new Date(course.endDate).toISOString().split('T')[0] : '';

      this.createForm.patchValue({
        title: course.title,
        description: course.description,
        beginDate: beginDate,
        endDate: endDate,
        status: course.status
      });
      
      console.log('Form values after patch:', this.createForm.value);
    }
  }

  onSubmit(): void {
    if (this.createForm.valid) {
      const formValue = this.createForm.value;
      console.log('Form submitted with values:', formValue);

      if (this.isEditing && this.courseId !== null) {
        const updatedCourse: Course = {
          ...formValue,
          id: this.courseId
        };
        console.log('Updating course:', updatedCourse);
        this.courseService.updateCourse(updatedCourse);
      } else {
        console.log('Adding new course:', formValue);
        this.courseService.addCourse(formValue);
      }
      this.resetForm();
    }
  }

  cancelEdit(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.isEditing = false;
    this.courseToEdit = null;
    this.courseId = null;
    this.formTitle = 'Crear Curso';
    this.createForm.reset({
      status: 'SCHEDULED'
    });
  }

  inputValid(inputName: 'title' | 'description' | 'beginDate' | 'endDate') {
    return this.createForm.get(inputName)?.valid && this.createForm.get(inputName)?.touched;
  }

  inputInvalid(inputName: 'title' | 'description' | 'beginDate' | 'endDate') {
    return (
      this.createForm.get(inputName)?.invalid &&
      this.createForm.get(inputName)?.touched &&
      this.createForm.get(inputName)?.dirty
    );
  }

  getError(inputName: 'title' | 'description' | 'beginDate' | 'endDate') {
    if (!this.createForm.get(inputName)?.errors) {
      return null;
    }

    const errors = Object.keys(this.createForm.get(inputName)?.errors as string[]);

    if (errors.length === 0) {
      return null;
    }

    let message = '';

    errors.forEach((error) => {
      switch (error) {
        case 'required':
          message += 'Este campo es obligatorio';
          break;
        case 'minlength':
          message += 'Este campo debe tener al menos 3 caracteres';
          break;

        default:
          break;
      }
    });

    return message;
  }
}
