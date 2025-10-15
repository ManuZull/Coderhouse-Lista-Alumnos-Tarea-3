import { Component, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

 

@Component({
  selector: 'app-abm-alumnos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './abm-alumnos.html',
  styleUrls: ['./abm-alumnos.css']
})
export class AbmAlumnos {
  @Output() alumnoAgregado = new EventEmitter<{nombre: string, apellido: string}>();
  form = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required)
  });

  agregarAlumno() {
    if (this.form.valid) {
      this.alumnoAgregado.emit(this.form.value as {nombre: string, apellido: string});
      this.form.reset();
    }
  }
}
