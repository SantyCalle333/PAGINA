# AngularFinDeSemana 🚀

¡Bienvenido a **AngularFinDeSemana**! Este es un proyecto desarrollado implementando los más altos estándares de **Angular Moderno (Componentes Standalone)**, enfocado estrictamente en la **Limpieza de Código (Clean Code)**, la separación de responsabilidades y la eficiencia.

El sistema funciona como un panel de gestión visual de entidades (Zapatillas, Videojuegos, Cursos) conectado bidireccionalmente a la nube.

---

## 🌟 Características Destacadas

* **Arquitectura Standalone:** Cero dependencias de módulos antiguos (`NgModules`). Cada componente es autosuficiente, ligero y modular.
* **Sincronización en Tiempo Real:** Conectado directamente a **Firebase Realtime Database** a través de la librería oficial `@angular/fire`.
* **Clean Code & SOLID:**
  * **Responsabilidad Única:** La lógica de red y base de datos vive 100% encapsulada en **Servicios Inyectables**, manteniendo los controladores (`.ts`) limpios y delegados solo a la interacción del usuario.
  * **Manejo de Memoria Inteligente:** Suscripciones a flujos de datos asíncronos controladas nativamente en el HTML con el `Async Pipe` y las nuevas directivas de flujo de control `@if / @for`.
  * **Diseño Semántico:** Todo el CSS está extraído en clases semánticas modulares en lugar de utilizar estilos en línea difíciles de mantener.
* **Auto-completado Dinámico:** Componentes con lógica inteligente (uso de `Set` de ES6) para filtrar marcas únicas y autocompletar modelos al escribir.
* **Pruebas Unitarias Aisladas:** Cada componente incluye su propia batería de pruebas `.spec.ts` utilizando "Mocks" (dobles de riesgo) para simular Firebase sin comprometer datos reales.

---

## 🛠️ Tecnologías y Stack

* **Framework Base:** Angular CLI (v21.2+)
* **Base de Datos:** Firebase Realtime Database
* **Runner de Pruebas:** Jasmine / Karma (Angular Test Bed)
* **Gestión de Interfaz:** Formularios `Template-Driven` (ngModel) y Vanilla CSS.
* **Licencia:** MIT (Open Source)

---

## 🚀 Guía de Inicio (Setup)

### 1. Preparar el Entorno
Una vez clonado este repositorio, abre una terminal en la raíz del proyecto e instala todas las dependencias necesarias:

```bash
npm install
```

### 2. Entorno de Desarrollo
Para levantar el servidor local en modo vigilancia (recarga automática al detectar cambios):

```bash
ng serve
```
Abre tu navegador en `http://localhost:4200/`.

---

## 🧪 Pruebas Unitarias

La calidad del software se mantiene mediante pruebas automatizadas. Para ejecutar toda la batería de `Specs` y comprobar que la inyección de dependencias y los "Spies" funcionan correctamente, corre:

```bash
ng test
```

---

## 🏗️ Anatomía del Proyecto

El código fuente está estructurado de manera modular para fácil escalabilidad:

```text
src/
├── app/
│   ├── components/       # Interfaces visuales (Cursos, Videojuegos, Zapatillas)
│   ├── models/           # Estructuras de datos y tipado estricto (Clases/Interfaces)
│   ├── services/         # Conexión pura a Firebase Realtime DB
│   ├── app.config.ts     # Inyección global de dependencias (FirebaseApp, Database)
│   └── app.component.ts  # Componente principal
└── dataconnect-generated/# Manuales y guías internas de uso (Setup y Usage)
```

---

## ⚖️ Licencia y Derechos

Este proyecto se distribuye bajo los términos de la **Licencia MIT** y el registro de obra ante la DNDA (puedes ver el archivo `LICENSE` en la raíz).

> *Código estructurado, refactorizado y documentado para la excelencia del desarrollador.*
