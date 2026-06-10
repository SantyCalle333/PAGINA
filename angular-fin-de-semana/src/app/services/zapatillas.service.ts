import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { Database, ref, listVal, push, remove } from '@angular/fire/database';
import { setLogLevel, LogLevel } from '@angular/fire';
import { Zapatilla } from '../models/zapatilla';
import { Observable } from 'rxjs';

/**
 * Yo soy el servicio de Zapatillas.
 * Me encargo de manejar toda la comunicación con la base de datos de Firebase.
 * Al aislar esto aquí, mantengo los componentes limpios y enfocados solo en la vista.
 */
@Injectable({
  providedIn: 'root'
})
export class ZapatillasService {
  private db: Database = inject(Database);
  private injector: Injector = inject(Injector);
  private zapatillas$: Observable<Zapatilla[]>;

  constructor() {
    // Yo silencio los logs de Firebase para mantener la consola limpia.
    setLogLevel(LogLevel.SILENT);
    
    // Yo creo una referencia a la colección 'zapatillas' y configuro un túnel continuo (Observable).
    const dbRef = ref(this.db, 'zapatillas');
    this.zapatillas$ = listVal<Zapatilla>(dbRef, { keyField: 'id' });
  }

  /**
   * Yo entrego el túnel de datos (Observable) a quien me lo pida.
   * Cualquier cambio en Firebase se reflejará instantáneamente a través de este canal.
   */
  obtenerZapatillas(): Observable<Zapatilla[]> {
    return this.zapatillas$;
  }

  /**
   * Yo recibo un objeto Zapatilla, le quito el ID (porque Firebase lo autogenera)
   * y lo empujo a la base de datos en la nube.
   */
  agregarZapatilla(zapatilla: Zapatilla) {
    return runInInjectionContext(this.injector, () => {
      const dbRef = ref(this.db, 'zapatillas');
      const zapa = JSON.parse(JSON.stringify(zapatilla));
      delete zapa.id;
      return push(dbRef, zapa);
    });
  }

  /**
   * Yo recibo un ID específico y lo borro de la base de datos permanentemente.
   */
  eliminarZapatilla(id: string) {
    return runInInjectionContext(this.injector, () => {
      const dbRef = ref(this.db, `zapatillas/${id}`);
      return remove(dbRef);
    });
  }
}
