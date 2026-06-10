# Configuración e Instalación (Setup)

Si alguien clona este proyecto por primera vez y necesita instalar las herramientas y dependencias, simplemente debe ejecutar el gestor de paquetes de Node.js (`npm`) en la raíz del proyecto.

```bash
npm install
```

## Angular y Firebase (Realtime Database)

La estructura de esta aplicación se generó utilizando Angular CLI con el formato moderno de componentes *Standalone*. Para integrar la base de datos, utilizamos el ecosistema oficial `@angular/fire`.

Si estuvieras configurando este proyecto desde cero, el comando principal de andamiaje (scaffolding) sería:

```bash
ng add @angular/fire
```

### Configuración en `app.config.ts`

Al no tener módulos (`app.module.ts`), toda la configuración central de Firebase y la provisión de la Base de Datos en Tiempo Real (Realtime Database) ocurre dentro del archivo principal `app.config.ts`.

La configuración de tu aplicación está estructurada de la siguiente manera:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// Importaciones fundamentales de Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    
    // 1. Inicializamos la conexión principal al proyecto de Firebase
    provideFirebaseApp(() => initializeApp({
      projectId: "tu-proyecto-id",
      appId: "tu-app-id",
      storageBucket: "tu-proyecto-id.appspot.com",
      apiKey: "TU_API_KEY_AQUI",
      authDomain: "tu-proyecto-id.firebaseapp.com",
      messagingSenderId: "123456789"
    })),

    // 2. Proveemos la conexión de la Base de Datos en Tiempo Real a toda la aplicación
    provideDatabase(() => getDatabase())
  ]
};
```

*(Nota: Las credenciales reales deben manejarse de forma segura usando variables de entorno o el objeto environment de Angular).*

### Uso Inmediato

Una vez que el archivo `app.config.ts` tiene esta estructura, los servicios internos (como `ZapatillasService`, `VideojuegosService`, y `CursosService`) pueden utilizar la inyección de dependencias `inject(Database)` de manera nativa y directa, sin configuraciones adicionales.
