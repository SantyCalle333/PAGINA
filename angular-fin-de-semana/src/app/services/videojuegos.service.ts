import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { Database, ref, listVal, push, remove } from '@angular/fire/database';
import { Videojuego } from '../models/videojuego';
import { Observable } from 'rxjs';

/**
 * Yo soy el servicio de Videojuegos.
 * Me encargo de encapsular toda la lógica de escritura y lectura de videojuegos hacia Firebase,
 * manteniendo a los componentes limpios y enfocados solo en renderizar HTML.
 */
@Injectable({
  providedIn: 'root'
})
export class VideojuegosService {
  private db: Database = inject(Database);
  private injector: Injector = inject(Injector);
  private videojuegos$: Observable<Videojuego[]>;

  constructor() {
    // Yo creo una referencia a la colección de 'videojuegos' en la base de datos
    // y establezco un flujo de datos en vivo (Observable).
    const dbRef = ref(this.db, 'videojuegos');
    this.videojuegos$ = listVal<Videojuego>(dbRef, { keyField: 'id' });
  }

  /**
   * Yo devuelvo el túnel de datos para que el componente HTML se suscriba usando el "Async Pipe".
   */
  obtenerVideojuegos(): Observable<Videojuego[]> {
    return this.videojuegos$;
  }

  /**
   * Yo recibo un objeto Videojuego, lo limpio quitándole el ID (que no puede ser undefined)
   * y lo empujo a la nube.
   */
  agregarVideojuego(videojuego: Videojuego) {
    return runInInjectionContext(this.injector, () => {
      const dbRef = ref(this.db, 'videojuegos');
      const v = JSON.parse(JSON.stringify(videojuego));
      delete v.id; 
      return push(dbRef, v);
    });
  }

  /**
   * Yo borro un videojuego específico de la base de datos usando su ID único.
   */
  eliminarVideojuego(id: string) {
    return runInInjectionContext(this.injector, () => {
      const dbRef = ref(this.db, `videojuegos/${id}`);
      return remove(dbRef);
    });
  }
}
