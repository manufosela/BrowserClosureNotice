[BrowserClosureNotice (ES)](Browser Closure Notice (ES))

[BrowserClosureNotice (EN)](Browser Closure Notice (EN))


# BrowsersClosureNotice (ES)

"Browser's Closure Notice" es una biblioteca javascript que ejecuta una función cuando detecta que el ratón se dirige hacia el cierre del navegador.
Su funcionamiento consiste en detectar la trayectoria del ratón cuando se acerca al borde superior derecho.
En sistemas operativos "Mac OS X" al borde superior izquierdo.

Demo: [http://manufosela.es/lib/browsersclosurenotice/demo.html]

#Métodos
La clase tiene 2 métodos:
* **detect**: para comenzar a detectar según los parámetros configurados cuando se dirige el ratón hacia el botón de cierre del navegador
* **undetect**: para dejar de monitorizar dicho comportamiento

#Parámetros de configuración
* **callback**: función que se ejecutará cuando se detecte la trayectoria hacia el cierre del navegador. Por defecto es un alert javascript.
* **maxTimes**: número de veces que se llamará al callback cuando detecte la trayectoria hacia el cierre del navegador. Por defecto es 1.
* **distanceNearClose**: distancia en pixeles desde el borde superior derecho (o izquierdo) a partir del cual empieza a contar si se dirige hacia el cierre del navegador. Por defecto es 100.
* **stepsTakenToClose**: número de pixeles de la trayectoria que debe seguir hacie el cierre del navegador. Por defecto 10.

#Ejemplo

```javascript
var args = { callback:function(){ alert("quiere cerrar"); }, maxTimes:0, stepsTakenToClose:20, distanceNearClose:250 };
var pcb = new BrowserClosureNotice( args );
pcb.detect();
```

# BrowserClosureNotice (EN)

"Browser Closure Notice" is a javascript library that execute a callback function when detect that the mouse go to the close browser button.

It works by detecting the path of the mouse when approaching the upper right edge.
Operating Systems "Mac OS X" on the left top edge.

Demo: [http://manufosela.es/lib/browserclosurenotice/demo.html]

#Méthods
The class has 2 methods:
* **detect**: to begin detecting, according to the parameters sets, when the mouse is directed toward the close button of the browser
* **undetect**: to stop detecting this behavior

#Configuration parameters
* **callback**: function to execute when the path is detected towards the end of the browser. By default is a javascript alert.
* **maxTimes**: number of times it calls the callback when it detects the path to the browser is closed. By default 1.
* **distanceNearClose**: distance in pixels from the upper right (or left) edge from which starts counting if directed towards the close browser button. By default 100.
* **stepsTakenToClose**: number of pixels of the path to be followed towards the close browser button. By default 20.

#Example

```javascript
var args = { callback:function(){ alert("Really do you want to close it?"); }, maxTimes:0, stepsTakenToClose:20, distanceNearClose:250 };
var pcb = new BrowserClosureNotice( args );
pcb.detect();
```
