import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesRoutingModule } from './courses-routing-module';
import { CoursesComponent } from './courses';
import { CoursesForm } from './courses-form/courses-form';
import { CoursesTable } from './courses-table/courses-table';

@NgModule({
  imports: [
    CommonModule,
    CoursesRoutingModule,
    CoursesComponent,
    CoursesForm,
    CoursesTable
  ]
})
export class CoursesModule { }
