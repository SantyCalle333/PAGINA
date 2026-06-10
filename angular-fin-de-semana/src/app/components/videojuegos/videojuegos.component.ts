import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { Videojuego } from '../../models/videojuego';
import { VideojuegosService } from '../../services/videojuegos.service';

/**
 * Yo soy el componente VideojuegosComponent.
 * Mi trabajo es recolectar lo que el usuario escribe, y mandar las órdenes al servicio
 * para agregar o eliminar juegos, además de controlar el título dinámico.
 */
@Component({
  selector: 'app-videojuegos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './videojuegos.component.html',
  styleUrls: ['./videojuegos.component.css']
})
export class VideojuegosComponent implements OnInit {
  // Variables atadas al formulario
  nuevoJuego: string = '';
  nuevotitulo: string = '';
  
  // Variables de estado
  public titulo: string = 'Componente de Videojuegos';
  
  // Yo expongo los videojuegos usando un Observable en vez de un arreglo normal, 
  // así evito tener que destruir suscripciones manualmente y dejo que Angular haga el trabajo pesado.
  public videojuegos$: Observable<Videojuego[]> = new Observable();

  constructor(private videojuegosService: VideojuegosService) {}
  
  /**
   * Yo me inicio justo cuando el componente aparece en pantalla.
   * En este punto, me engancho al flujo de datos de Firebase llamando a 'obtenerVideojuegos()'.
   */
  ngOnInit() {
    this.videojuegos$ = this.videojuegosService.obtenerVideojuegos();
  }
  
  /**
   * Yo me encargo de validar que no me pasen un juego vacío y luego le paso 
   * la responsabilidad de guardarlo en la nube a mi servicio de videojuegos.
   */
  agregarJuego() {
    if (this.nuevoJuego.trim()) {
      const nuevoObj = new Videojuego(this.nuevoJuego.trim());
      this.videojuegosService.agregarVideojuego(nuevoObj);
      this.nuevoJuego = '';
    }
  }

  /**
   * Yo elimino un juego llamando al servicio, siempre y cuando el juego tenga un ID válido.
   */
  eliminarJuego(juego: Videojuego) {
    if (juego.id) {
      this.videojuegosService.eliminarVideojuego(juego.id);
    }
  }

  /**
   * Yo reemplazo el título actual de la ventana por uno nuevo ingresado por el usuario,
   * y luego limpio la caja de texto.
   */
  cambiarTitulo() {
    if (this.nuevotitulo.trim()) {
      this.titulo = this.nuevotitulo;
      this.nuevotitulo = '';
    }
  }
}
