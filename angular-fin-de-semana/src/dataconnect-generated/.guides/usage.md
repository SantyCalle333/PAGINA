# Guía de Uso (Usage)

Esta guía explica cómo utilizar los servicios de Firebase (`ZapatillasService`, `VideojuegosService`, `CursosService`) dentro de los componentes de Angular en tu proyecto.

## 1. Inyectar el Servicio

Dado que el proyecto utiliza componentes *Standalone* y Angular moderno (v14+), inyectamos el servicio deseado directamente en el constructor del componente donde lo vamos a usar.

```typescript
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// 1. Importar el modelo y el servicio
import { CursosService } from '../../services/cursos.service';
import { Curso } from '../../models/curso';

@Component({
  selector: 'app-cursos',
  standalone: true,
  templateUrl: './cursos.component.html'
})
export class Cursos implements OnInit {
  
  // 2. Preparar la variable reactiva (Observable)
  public cursos$: Observable<Curso[]> = new Observable();

  // 3. Inyectar el servicio en el constructor
  constructor(private cursosService: CursosService) {}
}
```

## 2. Lectura en Tiempo Real (Queries)

Para leer datos, no hacemos llamadas a una API tradicional (como `fetch` o `HttpClient`), sino que abrimos un "túnel" de datos en vivo usando Observables.

### En el Controlador (`.ts`)

Conectamos la variable al flujo de datos en el ciclo de vida `ngOnInit`:

```typescript
  ngOnInit() {
    this.cursos$ = this.cursosService.obtenerCursos();
  }
```

### En la Vista (`.html`)

Para mostrar los datos sin riesgo de fugas de memoria, utilizamos el conducto asíncrono (`async pipe`) integrado con la directiva `@if` de Angular 17+:

```html
<!-- Nos suscribimos al flujo de datos y lo nombramos "cursos" -->
@if (cursos$ | async; as cursos) {
  <ul>
    <!-- Iteramos sobre la lista en vivo -->
    @for (curso of cursos; track $index) {
      <li>{{ curso.nombre }}</li>
    }
  </ul>
}
```

## 3. Escritura y Eliminación (Mutations)

Las modificaciones a la base de datos se manejan instanciando un modelo y pasándoselo al servicio. 

### Agregar (Create)

Creamos una instancia del modelo y se la pasamos al método `agregar...()` correspondiente. Firebase le asignará un ID automáticamente.

```typescript
  agregarCurso(nombre: string) {
    if (nombre.trim()) {
      // Usamos la clase modelo (que no requiere ID en su constructor)
      const nuevoObj = new Curso(nombre);
      this.cursosService.agregarCurso(nuevoObj);
    }
  }
```

### Eliminar (Delete)

Para eliminar un registro, debemos conocer su ID único en la nube. El objeto recuperado mediante la lectura ya lo incluye de forma predeterminada.

```typescript
  eliminarCurso(curso: Curso) {
    if (curso.id) {
      this.cursosService.eliminarCurso(curso.id);
    }
  }
```

## Resumen de Buenas Prácticas

1. **Código Limpio:** Nunca usar `.subscribe()` en el controlador TypeScript si solo vas a pintar datos en pantalla. Usa siempre el `async pipe` en el HTML.
2. **Encapsulamiento:** Nunca inyectar `Database` de Firebase directamente en los componentes visuales. Todo debe pasar por los servicios (`CursosService`, etc.).
3. **Clases Modelo:** Tipar estrictamente los datos usando las clases de `src/app/models/` antes de enviarlos a Firebase.