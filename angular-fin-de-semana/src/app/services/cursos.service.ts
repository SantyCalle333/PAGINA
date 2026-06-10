import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { Database, ref, listVal, push, remove } from '@angular/fire/database';
import { Curso } from '../models/curso';
import { Observable } from 'rxjs';

/**
 * Yo soy el servicio de Cursos.
 * Sirvo como puente de comunicación entre el componente de cursos y la base de datos de Firebase,
 * respetando el principio de Responsabilidad Única.
 */
@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private db: Database = inject(Database);
  private injector: Injector = inject(Injector);
  private cursos$: Observable<Curso[]>;

  constructor() {
    // Yo conecto mi conducto de datos a la rama 'cursos' de Firebase.
    const dbRef = ref(this.db, 'cursos');
    this.cursos$ = listVal<Curso>(dbRef, { keyField: 'id' });
  }

  /**
   * Yo proveo el flujo de cursos en vivo a quien necesite leerlos.
   */
  obtenerCursos(): Observable<Curso[]> {
    return this.cursos$;
  }

  /**
   * Yo elimino el identificador interno del objeto Curso y lo subo limpio a Firebase.
   */
  agregarCurso(curso: Curso) {
    return runInInjectionContext(this.injector, () => {
      const dbRef = ref(this.db, 'cursos');
      const c = JSON.parse(JSON.stringify(curso));
      delete c.id;
      return push(dbRef, c);
    });
  }

  /**
   * Yo me dirijo exactamente a la ruta del curso en Firebase usando su ID y lo elimino.
   */
  eliminarCurso(id: string) {
    return runInInjectionContext(this.injector, () => {
      const dbRef = ref(this.db, `cursos/${id}`);
      return remove(dbRef);
    });
  }
}
