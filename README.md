# Proyecto de Gestión de Productos de Tienda 3LRENDER con Express, Handlebars, Socket.IO y MONGO DB

Este proyecto es una aplicación web avanzada diseñada para gestionar productos en un entorno de comercio electrónico orientado a un estudio de arquitectura llamado 3LRENDER, especializado en la creación de imágenes tridimensionales (3D). La aplicación no solo permite la visualización, adición y eliminación de productos, sino que también implementa funcionalidades de actualización en tiempo real, lo que la convierte en una herramienta poderosa para la gestión dinámica de inventarios.

La plataforma está construida sobre Node.js, utilizando Express.js como el framework principal para el desarrollo del backend. Para la generación de vistas dinámicas, se ha empleado Handlebars, un motor de plantillas que facilita la personalización de la interfaz de usuario. La actualización en tiempo real es posible gracias a la integración de Socket.IO, una biblioteca que permite la comunicación bidireccional entre el cliente y el servidor, asegurando que cualquier cambio en los productos se refleje instantáneamente en la vista del usuario.

El proyecto también incorpora Mongoose para interactuar con MongoDB, gestionando de manera eficiente la base de datos que almacena la información de los productos y los carritos de compra. Además, se han implementado rutas API RESTful que permiten la manipulación directa de los productos y carritos, incluyendo funcionalidades avanzadas como la eliminación de productos específicos dentro de un carrito, la actualización de cantidades, y la visualización detallada de los productos en el carrito utilizando "populate".

En resumen, esta aplicación no solo es una solución práctica para la gestión de productos, sino que también ofrece una experiencia de usuario robusta y fluida, garantizando que todas las operaciones se realicen de manera eficiente y sin interrupciones.


## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución de JavaScript en el servidor.
- **Express.js**: Framework web para Node.js.
- **Handlebars**: Motor de plantillas para la generación de vistas dinámicas.
- **Socket.IO**: Biblioteca que permite la comunicación bidireccional en tiempo real entre cliente y servidor.
- **MongoDB**: Base de datos NoSQL utilizada para almacenar los productos y carritos.
- **Mongoose**: Librería de modelado de datos de MongoDB para Node.js.

## Funcionalidades

- **Visualización de Productos**: Muestra una lista de productos almacenados en la base de datos.
- **Gestión de Productos**: Permite agregar, actualizar y eliminar productos desde una interfaz web.
- **Gestión de Carritos**: Los usuarios pueden agregar productos a carritos, actualizar la cantidad de productos en un carrito, y eliminar productos de un carrito.
- **Actualización en Tiempo Real**: Las adiciones, actualizaciones y eliminaciones de productos y carritos se reflejan automáticamente en todos los clientes conectados mediante Socket.IO.

## Instalación

1. Clonar el repositorio: git clone https://github.com/tu-usuario/tu-repositorio.git
2. Abre una terminal en el directorio del proyecto.
3. Instalar dependencias:npm install
4. Configurar la base de datos en `src/config/db.js` o en tu archivo de configuración.
5. Iniciar el servidor:npm run dev
6. Abrir el navegador y navegar a [http://localhost:8000](http://localhost:8000).

## Contribución

Las contribuciones son bienvenidas. Si encuentras un error o tienes alguna sugerencia, por favor abre un issue o envía un pull request.

## Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para obtener más información.