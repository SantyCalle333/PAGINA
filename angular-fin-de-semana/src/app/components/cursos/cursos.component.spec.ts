import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cursos } from './cursos.component';
import { CursosService } from '../../services/cursos.service';
import { of } from 'rxjs';
import { Curso } from '../../models/curso';

/**
 * Yo soy el probador automático de CursosComponent.
 * Mi función es certificar que las acciones del usuario, como agregar o eliminar cursos,
 * realmente disparen las funciones correctas en el servicio mockeado.
 */
describe('CursosComponent', () => {
  let component: Cursos;
  let fixture: ComponentFixture<Cursos>;
  let cursosServiceSpy: jasmine.SpyObj<CursosService>;

  beforeEach(async () => {
    // Creamos el mock de Firebase
    const spy = jasmine.createSpyObj('CursosService', ['obtenerCursos', 'agregarCurso', 'eliminarCurso']);
    
    spy.obtenerCursos.and.returnValue(of([
      { id: '1', nombre: 'Angular para Principiantes' },
      { id: '2', nombre: 'React Avanzado' }
    ] as Curso[]));

    await TestBed.configureTestingModule({
      imports: [Cursos],
      providers: [
        { provide: CursosService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Cursos);
    component = fixture.componentInstance;
    cursosServiceSpy = TestBed.inject(CursosService) as jasmine.SpyObj<CursosService>;
    
    fixture.detectChanges(); // Llama a ngOnInit
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el observable de cursos', () => {
    expect(cursosServiceSpy.obtenerCursos).toHaveBeenCalled();
    component.cursos$.subscribe(cursos => {
      expect(cursos.length).toBe(2);
      expect(cursos[1].nombre).toBe('React Avanzado');
    });
  });

  it('debería agregar un curso si no está vacío', () => {
    component.nuevoCurso = 'Curso de Testing';
    component.agregarCurso();
    
    expect(cursosServiceSpy.agregarCurso).toHaveBeenCalled();
    const arg = cursosServiceSpy.agregarCurso.calls.mostRecent().args[0];
    expect(arg.nombre).toBe('Curso de Testing');
    expect(component.nuevoCurso).toBe('');
  });

  it('no debería agregar un curso si está vacío o tiene puros espacios', () => {
    component.nuevoCurso = '    ';
    component.agregarCurso();
    
    expect(cursosServiceSpy.agregarCurso).not.toHaveBeenCalled();
  });

  it('debería eliminar un curso si tiene ID', () => {
    const cursoFicticio = { id: 'test-curso-id', nombre: 'Test' } as Curso;
    component.eliminarCurso(cursoFicticio);
    
    expect(cursosServiceSpy.eliminarCurso).toHaveBeenCalledWith('test-curso-id');
  });
});
