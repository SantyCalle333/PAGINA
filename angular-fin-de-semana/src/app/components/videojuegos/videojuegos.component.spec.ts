import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideojuegosComponent } from './videojuegos.component';
import { VideojuegosService } from '../../services/videojuegos.service';
import { of } from 'rxjs';
import { Videojuego } from '../../models/videojuego';

/**
 * Yo soy la batería de pruebas de VideojuegosComponent.
 * Mi deber es asegurar que se pasen los datos correctos al mock de Firebase
 * y que el cambio de títulos funcione sin problemas.
 */
describe('VideojuegosComponent', () => {
  let component: VideojuegosComponent;
  let fixture: ComponentFixture<VideojuegosComponent>;
  let videojuegosServiceSpy: jasmine.SpyObj<VideojuegosService>;

  beforeEach(async () => {
    // Creamos un Mock (doble) del servicio real de Firebase
    const spy = jasmine.createSpyObj('VideojuegosService', ['obtenerVideojuegos', 'agregarVideojuego', 'eliminarVideojuego']);
    
    // Le decimos al mock que, cuando se llame a obtenerVideojuegos, 
    // devuelva instantáneamente este arreglo falso usando 'of()' de RxJS.
    spy.obtenerVideojuegos.and.returnValue(of([
      { id: '1', nombre: 'Super Mario 64' },
      { id: '2', nombre: 'Zelda Ocarina of Time' }
    ] as Videojuego[]));

    await TestBed.configureTestingModule({
      imports: [VideojuegosComponent], // Usamos imports porque es Standalone Component
      providers: [
        { provide: VideojuegosService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VideojuegosComponent);
    component = fixture.componentInstance;
    videojuegosServiceSpy = TestBed.inject(VideojuegosService) as jasmine.SpyObj<VideojuegosService>;
    
    // Ejecutamos ngOnInit
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el observable de videojuegos llamando al servicio', () => {
    expect(videojuegosServiceSpy.obtenerVideojuegos).toHaveBeenCalled();
    component.videojuegos$.subscribe(juegos => {
      expect(juegos.length).toBe(2);
      expect(juegos[0].nombre).toBe('Super Mario 64');
    });
  });

  it('debería cambiar el título cuando se llama a cambiarTitulo()', () => {
    component.nuevotitulo = 'Nuevo Título Épico';
    component.cambiarTitulo();
    
    expect(component.titulo).toBe('Nuevo Título Épico');
    expect(component.nuevotitulo).toBe(''); // Verifica que limpia el input
  });

  it('no debería cambiar el título si está vacío', () => {
    const tituloOriginal = component.titulo;
    component.nuevotitulo = '   ';
    component.cambiarTitulo();
    
    expect(component.titulo).toBe(tituloOriginal); // Sigue igual
  });

  it('debería agregar un juego llamando al servicio si no está vacío', () => {
    component.nuevoJuego = 'Elden Ring';
    component.agregarJuego();
    
    expect(videojuegosServiceSpy.agregarVideojuego).toHaveBeenCalled();
    // Verificamos que el argumento enviado al servicio sea una instancia válida
    const arg = videojuegosServiceSpy.agregarVideojuego.calls.mostRecent().args[0];
    expect(arg.nombre).toBe('Elden Ring');
    expect(component.nuevoJuego).toBe(''); // Limpia el input
  });

  it('no debería agregar un juego si el input está vacío', () => {
    component.nuevoJuego = '   ';
    component.agregarJuego();
    
    expect(videojuegosServiceSpy.agregarVideojuego).not.toHaveBeenCalled();
  });

  it('debería llamar a eliminarVideojuego en el servicio si el juego tiene ID', () => {
    const juegoFalso = { id: 'test-id', nombre: 'Test Game' } as Videojuego;
    component.eliminarJuego(juegoFalso);
    
    expect(videojuegosServiceSpy.eliminarVideojuego).toHaveBeenCalledWith('test-id');
  });
});
