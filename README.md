AplicativoInversionesLR — EstanciaYa

Aplicación web desarrollada para Inversiones LR, orientada a la consulta y reserva simulada de alojamientos temporales. Permite explorar propiedades, aplicar filtros, consultar detalles, cotizar estancias y visualizar las reservas realizadas.

Esta versión corresponde al frontend del aplicativo. Los alojamientos se obtienen de un archivo JSON y las reservas se almacenan localmente en el navegador.

Tecnologías utilizadas

* Angular CLI 22.2.2: framework de desarrollo.
* TypeScript: lenguaje de programación.
* HTML5 y CSS3: estructura y estilos.
* Bootstrap: diseño adaptable y componentes visuales.
* Angular Router: navegación entre vistas.
* HttpClient y RxJS: consulta y gestión de datos asíncronos.
* JSON: almacenamiento de los datos iniciales.
* localStorage: persistencia local de las reservas.

Requisitos previos

* Node.js y npm instalados.
* Git, si se desea clonar el repositorio.
* Un navegador web actualizado.

Instalación y ejecución

Clona el repositorio:

git clone https://github.com/samueldr1307/aplicativoInversionesLR.git

Ingresa a la carpeta del proyecto:

cd aplicativoInversionesLR

Instala las dependencias:

npm install

Inicia el servidor de desarrollo:

ng serve

Abre en el navegador http://localhost:4200/.

La aplicación se recargará automáticamente cuando se realicen cambios en los archivos fuente.

Si Angular CLI no está disponible globalmente, puedes ejecutar npx ng serve.

Funcionalidades principales

* Página de inicio: presenta la plataforma y los tres alojamientos activos con mejor calificación.
* Listado de alojamientos: muestra información como nombre, ciudad, tipo, capacidad, precio por noche, calificación e imágenes.
* Filtros: permite buscar por ciudad, número de huéspedes, tipo de alojamiento y precio máximo.
* Limpieza de filtros: restablece los criterios de búsqueda.
* Detalle del alojamiento: presenta descripción, ubicación, capacidad, habitaciones, camas, baños, servicios, reglas, imágenes y reseñas.
* Cotización: calcula el número de noches, subtotal, tarifa de limpieza, tarifa de servicio y valor total.
* Reserva simulada: valida los datos del huésped y registra la reserva con estado CONFIRMADA.
* Mis reservas: muestra las reservas realizadas y sus datos principales.
* Navegación: mantiene el menú y el pie de página en las diferentes vistas.

Rutas de navegación

Ruta	Funcionalidad
/	Página de inicio
/listado	Listado y filtros
/alojamiento/:id	Detalle y cotización
/reservar	Formulario de reserva
/mis-reservas	Consulta de reservas

Reglas de negocio

1. La fecha de llegada no puede ser anterior a la fecha actual.
2. La fecha de salida debe ser posterior a la fecha de llegada.
3. El número de huéspedes debe ser mayor que cero y no superar la capacidad del alojamiento.
4. El precio por noche debe ser mayor que cero.
5. Solo se permite cotizar con fechas y número de huéspedes válidos.
6. Solo se puede reservar después de generar una cotización válida.
7. El subtotal se calcula multiplicando las noches por el precio por noche.
8. La tarifa de limpieza corresponde al valor definido para cada alojamiento.
9. La tarifa de servicio equivale al 10 % del subtotal.
10. El total corresponde al subtotal más las tarifas de limpieza y servicio.
11. Los alojamientos inactivos no aparecen en el listado ni en los destacados.
12. Si cambian las fechas o los huéspedes después de cotizar, se debe generar una nueva cotización.
13. El nombre del huésped es obligatorio y el correo debe tener un formato válido.
14. Las reservas confirmadas tienen estado CONFIRMADA y la cotización utilizada no puede reutilizarse.

Estructura y buenas prácticas

El proyecto organiza sus responsabilidades en componentes, servicios y modelos.

* Componentes: gestionan las vistas, formularios y la interacción con el usuario.
* DataService: consulta los alojamientos y las reseñas desde el archivo JSON mediante HttpClient.
* ReservaService: gestiona las cotizaciones, crea las reservas y las almacena en localStorage.
* Modelos: definen la estructura de los alojamientos, reseñas, reservas y filtros.

Para mantener un código organizado y fácil de mantener:

* Evitar el acceso directo al archivo JSON desde los componentes; utilizar DataService.
* Mantener separadas la presentación, la lógica de negocio y el acceso a los datos.
* Reutilizar componentes cuando cumplan la misma función, como las tarjetas de alojamientos.
* Utilizar @Input y @Output para la comunicación entre componentes cuando corresponda.
* Centralizar la navegación mediante las rutas de Angular.
* Validar los formularios y mostrar mensajes claros ante errores o resultados vacíos.
* Utilizar nombres descriptivos y mantener una estructura coherente.
* Evitar duplicar lógica y cálculos entre componentes.
* No almacenar contraseñas, secretos ni información sensible en el código fuente.

Datos y persistencia

Los datos iniciales de los alojamientos y las reseñas se consultan desde marketplace-data.json mediante DataService.

Las reservas se guardan en localStorage mediante ReservaService, por lo que permanecen disponibles al recargar la página en el mismo navegador. Si se borran los datos del navegador, las reservas almacenadas localmente pueden perderse.

Importante: esta versión no cuenta con backend ni base de datos centralizada. Las reservas son simuladas y no representan una confirmación comercial real ni incluyen procesamiento de pagos.

Construcción del proyecto

Para compilar la aplicación:

ng build

Los archivos generados se almacenan en el directorio dist/. La compilación de producción aplica optimizaciones para mejorar el rendimiento.

Pruebas

Para ejecutar las pruebas unitarias configuradas con Vitest:

ng test

Para ejecutar pruebas de extremo a extremo:

ng e2e

El comando ng e2e requiere que el proyecto tenga configurado un framework compatible de pruebas end-to-end.

Generación de componentes

Angular CLI permite generar componentes y otros elementos mediante comandos. Por ejemplo:

ng generate component nombre-componente

Para consultar los comandos disponibles:

ng generate --help

Alcance de esta versión

El aplicativo prioriza el funcionamiento del listado, los filtros, el detalle de los alojamientos, las cotizaciones y las reservas simuladas. El prototipo visual de Figma sirve como referencia de diseño, pero algunas funcionalidades propuestas, como el inicio de sesión y la búsqueda con fechas desde la portada, no forman parte de esta versión.

Repositorio

GitHub — aplicativoInversionesLR

⸻

Proyecto académico: Desarrollo de Sistemas de Información 3.

Plataforma: EstanciaYa — Inversiones LR.
