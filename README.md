# BrowserClosureNotice

[![npm version](https://img.shields.io/npm/v/browser-closure-notice.svg)](https://www.npmjs.com/package/browser-closure-notice)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

[English](#english) | [Español](#español)

---

## Español

"Browser Closure Notice" es una biblioteca JavaScript ES6 que ejecuta una función callback cuando detecta que el ratón se dirige hacia el botón de cierre del navegador.

Su funcionamiento consiste en detectar la trayectoria del ratón cuando se acerca al borde superior derecho (o superior izquierdo en Mac OS X).

### 🚀 Instalación

```bash
npm install browser-closure-notice
```

### 📦 Uso

**Importación ES6:**

```javascript
import BrowserClosureNotice from 'browser-closure-notice';

const bcn = new BrowserClosureNotice({
  callback: () => { alert("¿Realmente quieres cerrar?"); },
  maxTimes: 0,
  stepsTakenToClose: 20,
  distanceNearClose: 250
});

bcn.detect();
```

**En el navegador (ES6 modules):**

```html
<script type="module">
  import BrowserClosureNotice from './browserclosurenotice.js';

  const bcn = new BrowserClosureNotice({
    callback: () => console.log("Detectado cierre del navegador"),
    maxTimes: 1
  });

  bcn.detect();
</script>
```

### 🎯 Métodos

La clase tiene 2 métodos:

- **`detect()`**: Comienza a detectar cuando el ratón se dirige hacia el botón de cierre del navegador
- **`unDetect()`**: Deja de monitorizar el comportamiento

### ⚙️ Parámetros de configuración

| Parámetro | Tipo | Por defecto | Descripción |
|-----------|------|-------------|-------------|
| `callback` | Function | `() => alert("really you want to go?")` | Función que se ejecutará cuando se detecte la trayectoria hacia el cierre |
| `maxTimes` | Number | `1` | Número de veces que se llamará al callback (0 = ilimitado) |
| `distanceNearClose` | Number | `100` | Distancia en píxeles desde el borde superior donde empieza a detectar |
| `stepsTakenToClose` | Number | `10` | Número de píxeles de trayectoria necesarios hacia el botón de cierre |

### 🖥️ Compatibilidad

**Versión 2.0+:** Navegadores modernos con soporte ES6 (Chrome, Firefox, Safari, Edge)

**Nota:** Si necesitas soporte para IE6-11, usa la versión 1.x

### 🧪 Ejemplo de desarrollo

El proyecto incluye un ejemplo interactivo con servidor de desarrollo:

```bash
cd example
npm install
npm run dev
```

Abre el navegador en `http://localhost:5173` para probar la librería con una UI interactiva.

### 📄 Licencia

MIT License - Copyright (c) 2015 @manufosela

---

## English

"Browser Closure Notice" is an ES6 JavaScript library that executes a callback function when it detects the mouse moving toward the browser's close button.

It works by detecting the mouse trajectory when approaching the upper right edge (or upper left edge on Mac OS X).

### 🚀 Installation

```bash
npm install browser-closure-notice
```

### 📦 Usage

**ES6 Import:**

```javascript
import BrowserClosureNotice from 'browser-closure-notice';

const bcn = new BrowserClosureNotice({
  callback: () => { alert("Really want to close?"); },
  maxTimes: 0,
  stepsTakenToClose: 20,
  distanceNearClose: 250
});

bcn.detect();
```

**Browser (ES6 modules):**

```html
<script type="module">
  import BrowserClosureNotice from './browserclosurenotice.js';

  const bcn = new BrowserClosureNotice({
    callback: () => console.log("Browser closure detected"),
    maxTimes: 1
  });

  bcn.detect();
</script>
```

### 🎯 Methods

The class has 2 methods:

- **`detect()`**: Start detecting when the mouse moves toward the browser close button
- **`unDetect()`**: Stop detecting this behavior

### ⚙️ Configuration Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `callback` | Function | `() => alert("really you want to go?")` | Function to execute when trajectory toward close button is detected |
| `maxTimes` | Number | `1` | Number of times to trigger callback (0 = unlimited) |
| `distanceNearClose` | Number | `100` | Distance in pixels from top edge where detection starts |
| `stepsTakenToClose` | Number | `10` | Number of pixels of trajectory needed toward close button |

### 🖥️ Browser Support

**Version 2.0+:** Modern browsers with ES6 support (Chrome, Firefox, Safari, Edge)

**Note:** If you need IE6-11 support, use version 1.x

### 🧪 Development Example

The project includes an interactive example with development server:

```bash
cd example
npm install
npm run dev
```

Open your browser at `http://localhost:5173` to test the library with an interactive UI.

### 📄 License

MIT License - Copyright (c) 2015 @manufosela
