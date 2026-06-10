import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZapatillasComponent } from './zapatillas.component';
import { ZapatillasService } from '../../services/zapatillas.service';
import { of } from 'rxjs';
import { Zapatilla } from '../../models/zapatilla';

/**
 * Yo soy la batería de pruebas de ZapatillasComponent.
 * Mi trabajo es asegurar que toda la lógica de UI y Firebase (mockeada) 
 * funcione perfectamente y no se rompa en futuras actualizaciones.
 */
describe('ZapatillasComponent', () => {
  let component: ZapatillasComponent;
  let fixture: ComponentFixture<ZapatillasComponent>;
  let zapatillasServiceSpy: jasmine.SpyObj<ZapatillasService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ZapatillasService', ['obtenerZapatillas', 'agregarZapatilla', 'eliminarZapatilla']);
    
    // Mock de datos de zapatillas
    spy.obtenerZapatillas.and.returnValue(of([
      { id: '1', nombre: 'Nike Air Max', marca: 'Nike', precio: 100, color: 'Negro', stock: true },
      { id: '2', nombre: 'Adidas Superstar', marca: 'Adidas', precio: 90, color: 'Blanco', stock: true },
      { id: '3', nombre: 'Nike Runner MD', marca: 'Nike', precio: 40, color: 'Gris', stock: true }
    ] as Zapatilla[]));

    await TestBed.configureTestingModule({
      imports: [ZapatillasComponent],
      providers: [
        { provide: ZapatillasService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ZapatillasComponent);
    component = fixture.componentInstance;
    zapatillasServiceSpy = TestBed.inject(ZapatillasService) as jasmine.SpyObj<ZapatillasService>;
    
    // Evitamos imprimir en la consola real durante las pruebas
    spyOn(console, 'log');
    
    fixture.detectChanges(); // Ejecuta ngOnInit
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llenar el arreglo de marcas únicas reactivamente en ngOnInit', () => {
    // Al iniciar, el mock devuelve 3 zapatillas, pero solo 2 marcas únicas (Nike, Adidas)
    expect(component.marcas.length).toBe(2);
    expect(component.marcas).toContain('Nike');
    expect(component.marcas).toContain('Adidas');
  });

  it('debería agregar una zapatilla copiando datos del catálogo si el nombre existe', () => {
    // Simulamos que el usuario escribe un nombre del catálogo
    component.nuevoZapatilla = 'Vans Old Skool'; 
    component.agregarZapatilla();
    
    expect(zapatillasServiceSpy.agregarZapatilla).toHaveBeenCalled();
    const arg = zapatillasServiceSpy.agregarZapatilla.calls.mostRecent().args[0];
    // Debería heredar la marca del catálogo original quemado en código
    expect(arg.marca).toBe('Vans'); 
    expect(component.nuevoZapatilla).toBe(''); // Limpia el input
  });

  it('debería agregar una zapatilla genérica si el nombre no está en el catálogo', () => {
    component.nuevoZapatilla = 'Zapatilla Inventada';
    component.agregarZapatilla();
    
    expect(zapatillasServiceSpy.agregarZapatilla).toHaveBeenCalled();
    const arg = zapatillasServiceSpy.agregarZapatilla.calls.mostRecent().args[0];
    // Valores genéricos
    expect(arg.marca).toBe('Sin marca');
    expect(arg.precio).toBe(0);
  });

  it('no debería agregar nada si el input está vacío', () => {
    component.nuevoZapatilla = '';
    component.agregarZapatilla();
    expect(zapatillasServiceSpy.agregarZapatilla).not.toHaveBeenCalled();
  });

  it('debería eliminar zapatilla si tiene ID', () => {
    const fake = { id: 'z123', nombre: 'Test' } as Zapatilla;
    component.eliminarZapatilla(fake);
    expect(zapatillasServiceSpy.eliminarZapatilla).toHaveBeenCalledWith('z123');
  });

  it('debería mostrar sugerencias al escribir en el input', () => {
    component.nuevoZapatilla = 'adi'; // Escribe parte de "Adidas"
    component.onInputChange();
    
    expect(component.mostrarSugerencias).toBeTrue();
    // En el catálogo original, "Adidas Superstar" y "Adidas Yeezy" coinciden?
    // En el componente tenemos quemado: Adidas Superstar, Adidas Yeezy
    expect(component.sugerencias.length).toBeGreaterThan(0);
  });

  it('debería ocultar sugerencias si el input se vacía', () => {
    component.nuevoZapatilla = '';
    component.onInputChange();
    
    expect(component.mostrarSugerencias).toBeFalse();
    expect(component.sugerencias.length).toBe(0);
  });

  it('debería auto-completar al presionar Tab', () => {
    component.sugerencias = ['Nike Air Max', 'Nike Runner'];
    const fakeEvent = { key: 'Tab', preventDefault: jasmine.createSpy('preventDefault') } as unknown as KeyboardEvent;
    
    component.onKeyDown(fakeEvent);
    
    expect(fakeEvent.preventDefault).toHaveBeenCalled();
    expect(component.nuevoZapatilla).toBe('Nike Air Max'); // Toma la primera
    expect(component.mostrarSugerencias).toBeFalse();
  });

  it('debería seleccionar sugerencia al hacer clic', () => {
    component.seleccionarSugerencia('Reebok Classic');
    expect(component.nuevoZapatilla).toBe('Reebok Classic');
    expect(component.mostrarSugerencias).toBeFalse();
  });
});
