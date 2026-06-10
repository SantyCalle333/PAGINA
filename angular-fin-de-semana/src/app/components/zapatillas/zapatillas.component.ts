import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { Zapatilla } from '../../models/zapatilla';
import { ZapatillasService } from '../../services/zapatillas.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

/**
 * Yo soy el componente ZapatillasComponent.
 * Mi trabajo es manejar la lógica visual y de usuario para las zapatillas.
 */
@Component({
	selector: 'app-zapatillas-core',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './zapatillas.component.html',
	styleUrl: './zapatillas.component.css'
})
export class ZapatillasComponent implements OnInit {
	public titulo: string = 'Componente de Zapatillas';
	
	// Yo contengo la suscripción a los datos en vivo de Firebase.
	public zapatillas$: Observable<Zapatilla[]> = new Observable();
	
	// Yo almaceno las marcas únicas sin duplicados para mostrarlas en la vista.
	public marcas: string[] = [];
	
	// Variables para el formulario y autocompletado.
	public nuevoZapatilla: string = '';
	public mostrarSugerencias: boolean = false;
	public sugerencias: string[] = [];
	
	// Yo soy un catálogo local estático para autocompletar modelos genéricos.
	public catalogoZapatillas: Zapatilla[] = [
		new Zapatilla('Nike Air Max', 'Nike', 100, 'Negro', true),
		new Zapatilla('Adidas Superstar', 'Adidas', 290, 'Blanco', true),
		new Zapatilla('Reebok Classic', 'Reebok', 80, 'Blanco', true),
		new Zapatilla('Nike Runner MD', 'Nike', 40, 'Negro', true),
		new Zapatilla('Adidas Yeezy', 'Adidas', 100, 'Gris', true),
		new Zapatilla('Puma Suede', 'Puma', 60, 'Rojo', true),
		new Zapatilla('Vans Old Skool', 'Vans', 50, 'Negro', true)
	];

	constructor(private zapatillasService: ZapatillasService) {}

	/**
	 * Yo me ejecuto justo cuando el componente se carga.
	 * Conecto el túnel de datos y me suscribo para recalcular mis marcas únicas reactivamente.
	 */
	ngOnInit() {
        this.zapatillas$ = this.zapatillasService.obtenerZapatillas();
		
		// Yo uso 'Set' para garantizar que las marcas sean únicas de forma más limpia y moderna que un 'indexOf'.
		this.zapatillas$.subscribe(zapatillas => {
			const marcasUnicas = new Set(zapatillas.map(z => z.marca));
			this.marcas = Array.from(marcasUnicas);
        });

		this.imprimirJson();
    }
	
	/**
	 * Yo agrego una nueva zapatilla. 
	 * Si su nombre coincide con el catálogo, heredo su marca y precio. Si no, creo una genérica.
	 */
	agregarZapatilla() {
		if (!this.nuevoZapatilla.trim()) return;

		const nombreBuscado = this.nuevoZapatilla.trim();
		const encontrada = this.catalogoZapatillas.find(z => z.nombre.toLowerCase() === nombreBuscado.toLowerCase());
		
		let nuevaZapa: Zapatilla;
		if (encontrada) {
			nuevaZapa = new Zapatilla(encontrada.nombre, encontrada.marca, encontrada.precio, encontrada.color, encontrada.stock);
		} else {
			nuevaZapa = new Zapatilla(nombreBuscado, 'Sin marca', 0, 'Sin color', true);
		}

		this.zapatillasService.agregarZapatilla(nuevaZapa);
		this.nuevoZapatilla = '';
	}
	
	/**
	 * Yo mando a borrar la zapatilla de la base de datos si esta tiene un ID válido.
	 */
	eliminarZapatilla(zapatillaAEliminar: Zapatilla) {
		if (zapatillaAEliminar.id) {
			this.zapatillasService.eliminarZapatilla(zapatillaAEliminar.id);
		}
	}

	/**
	 * Yo tomo el estado actual de la base de datos (solo una vez gracias a 'take(1)') 
	 * y lo imprimo en la consola como un JSON puro.
	 */
	imprimirJson() {
		this.zapatillas$.pipe(take(1)).subscribe(zapatillas => {
			console.log('JSON actual en Firebase:', JSON.stringify(zapatillas, null, 2));
		});
	}

	/**
	 * Yo reviso qué escribe el usuario para mostrarle sugerencias en pantalla que coincidan con mi catálogo.
	 */
	onInputChange() {
		const texto = this.nuevoZapatilla.trim().toLowerCase();
		if (texto.length > 0) {
			this.sugerencias = this.catalogoZapatillas
				.map(z => z.nombre)
				.filter(nombre => nombre.toLowerCase().includes(texto));
			this.mostrarSugerencias = this.sugerencias.length > 0;
		} else {
			this.sugerencias = [];
			this.mostrarSugerencias = false;
		}
	}

	/**
	 * Yo auto-completo el input con la primera sugerencia disponible cuando presionan 'Tab'.
	 */
	onKeyDown(event: KeyboardEvent) {
		if (event.key === 'Tab' && this.sugerencias.length > 0) {
			event.preventDefault();
			this.nuevoZapatilla = this.sugerencias[0];
			this.sugerencias = [];
			this.mostrarSugerencias = false;
		}
	}

	/**
	 * Yo me encargo de llenar el input cuando el usuario hace clic directamente en una sugerencia.
	 */
	seleccionarSugerencia(sugerencia: string) {
		this.nuevoZapatilla = sugerencia;
		this.sugerencias = [];
		this.mostrarSugerencias = false;
	}
}
