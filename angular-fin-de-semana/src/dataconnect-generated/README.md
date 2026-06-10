# README del SDK Interno (Servicios de Firebase)

Este README es creado con el fin de entender proceso de uso de los servicios de conexión a Firebase creados para este proyecto. También incluiré ejemplos sobre cómo usar estos servicios para realizar lecturas (Queries) y escrituras/eliminaciones (Mutaciones) en tu base de datos en tiempo real.

## Tabla de Contenidos
- [**Visión General**](#visión-general)
- [**Accediendo a los Servicios**](#accediendo-a-los-servicios)
- [**Consultas (Lecturas en Tiempo Real)**](#consultas-lecturas-en-tiempo-real)
  - [*obtenerZapatillas*](#obtenerzapatillas)
- [**Mutaciones (Escrituras y Eliminaciones)**](#mutaciones-escrituras-y-eliminaciones)
  - [*agregarZapatilla*](#agregarzapatilla)
  - [*eliminarZapatilla*](#eliminarzapatilla)

---

## Accediendo a los Servicios

En este proyecto, la lógica de base de datos está encapsulada en servicios dedicados (`ZapatillasService`, `VideojuegosService`, `CursosService`). Un servicio actúa como un puente directo entre tus componentes visuales y Firebase Realtime Database.

Puedes usar estos servicios inyectándolos en el constructor de tus componentes de Angular.

```typescript
import { Component, OnInit } from '@angular/core';
import { ZapatillasService } from '../../services/zapatillas.service';

@Component({
  selector: 'app-mi-componente',
  standalone: true
})
export class MiComponente {
  // Inyección de dependencias clásica de Angular
  constructor(private zapatillasService: ZapatillasService) {}
}
```

---

## Consultas (Lecturas en Tiempo Real)

Hay una forma principal de ejecutar una consulta (Query) en nuestro proyecto:
- Suscribiéndote al `Observable` que retorna el servicio. Este conducto se mantiene abierto, lo que significa que cualquier cambio en la nube actualizará tu interfaz automáticamente.

A continuación, se muestran ejemplos de cómo usar el servicio generado para ejecutar consultas. 

### obtenerZapatillas

Puedes conectarte al flujo de zapatillas usando la función `obtenerZapatillas()`. Esta función no requiere variables y retorna un `Observable` de un arreglo de tipo `Zapatilla[]`.

#### Tipo de Retorno
Recordemos que ejecutar `obtenerZapatillas` devuelve un flujo continuo (Observable) de datos con la siguiente interfaz:

```typescript
export class Zapatilla {
  id?: string;
  nombre: string;
  marca: string;
  precio: number;
  color: string;
  stock: boolean;
}
```

#### Ejemplo de uso en el Controlador (TypeScript)

La mejor práctica en Angular es no usar `.subscribe()` manualmente, sino pasar el Observable a la vista HTML para evitar fugas de memoria.

```typescript
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Zapatilla } from '../../models/zapatilla';
import { ZapatillasService } from '../../services/zapatillas.service';

export class ZapatillasComponent implements OnInit {
  public zapatillas$: Observable<Zapatilla[]>;

  constructor(private zapatillasService: ZapatillasService) {}

  ngOnInit() {
    // Abrimos el túnel de datos
    this.zapatillas$ = this.zapatillasService.obtenerZapatillas();
  }
}
```

#### Ejemplo de uso en la Vista (HTML)
Usando el `async` pipe de Angular.

```html
@if (zapatillas$ | async; as zapatillas) {
  <ul>
    @for (zapatilla of zapatillas; track $index) {
      <li>{{ zapatilla.nombre }} - ${{ zapatilla.precio }}</li>
    }
  </ul>
}
```

---

## Mutaciones (Escrituras y Eliminaciones)

Las mutaciones cambian el estado de la base de datos. En nuestro proyecto, esto se logra enviando el objeto completo al servicio para que este lo suba a Firebase mediante la función `push` o lo borre mediante la función `remove`.

### agregarZapatilla

Para insertar un nuevo dato, llamas al método `agregarZapatilla()` pasándole la variable requerida.

#### Variables Requeridas
La mutación requiere un argumento de la clase `Zapatilla` sin ID (Firebase le asignará un ID alfanumérico único automáticamente).

#### Ejemplo de uso

```typescript
import { Component } from '@angular/core';
import { Zapatilla } from '../../models/zapatilla';
import { ZapatillasService } from '../../services/zapatillas.service';

export class ZapatillasComponent {
  constructor(private zapatillasService: ZapatillasService) {}

  guardarNuevaZapatilla() {
    // 1. Preparamos el objeto
    const nuevaZapa = new Zapatilla(
      'Air Max', // nombre
      'Nike',    // marca
      120,       // precio
      'Rojo',    // color
      true       // stock
    );

    // 2. Ejecutamos la mutación
    this.zapatillasService.agregarZapatilla(nuevaZapa);
    console.log("¡Zapatilla guardada con éxito en la nube!");
  }
}
```

### eliminarZapatilla

Para borrar un dato existente, pasas explícitamente el `id` único del objeto a la función `eliminarZapatilla()`.

#### Variables Requeridas
La mutación requiere un string correspondiente al `id` del registro en Firebase.

#### Ejemplo de uso

```typescript
  borrarZapatilla(zapatilla: Zapatilla) {
    // Verificamos que el ID exista antes de intentar borrar
    if (zapatilla.id) {
      this.zapatillasService.eliminarZapatilla(zapatilla.id);
      console.log("Registro eliminado correctamente");
    }
  }
```

*(Nota: Este mismo patrón de Consultas y Mutaciones aplica exactamente igual para `VideojuegosService` y `CursosService`).*
