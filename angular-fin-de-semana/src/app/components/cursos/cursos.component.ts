import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { Curso } from '../../models/curso';
import { CursosService } from '../../services/cursos.service';

/**
 * Yo soy el componente Cursos.
 * Me encargo de orquestar la vista de los cursos y de capturar lo que el usuario 
 * teclea para mandárselo al servicio.
 */
@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css',
})
export class Cursos implements OnInit {
  // Variables atadas al input de texto usando [(ngModel)]
  nuevoCurso: string = '';
  
  // Variables de estado
  titulo: string = 'Componente de Cursos';
  listado: string = 'Listado de Cursos';
  
  // Yo mantengo el canal de datos conectado a Firebase. Uso el signo $ al final 
  // para denotar visualmente que soy un Observable y no un arreglo normal.
  public cursos$: Observable<Curso[]> = new Observable();
  
  constructor(private cursosService: CursosService) {}

  /**
   * Yo arranco el motor justo cuando Angular renderiza este componente.
   * Me enchufo a la manguera de datos del servicio de cursos.
   */
  ngOnInit() {
    this.cursos$ = this.cursosService.obtenerCursos();
  }

  /**
   * Yo atrapo el texto del input, reviso que no esté vacío, 
   * creo un objeto Curso nuevo y se lo doy al servicio para que lo guarde.
   */
  agregarCurso() {
    if (this.nuevoCurso.trim()) {
      const nuevoObj = new Curso(this.nuevoCurso.trim());
      this.cursosService.agregarCurso(nuevoObj);
      this.nuevoCurso = ''; // Me encargo de vaciar la caja de texto después de guardar
    }
  }

  /**
   * Yo comando la destrucción del curso pasándole su ID único al servicio.
   */
  eliminarCurso(curso: Curso) {
    if (curso.id) {
      this.cursosService.eliminarCurso(curso.id);
    }
  }
}