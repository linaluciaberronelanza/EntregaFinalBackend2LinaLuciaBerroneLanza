# Proyecto de Gestión de Productos de tienda 3LRENDER con Express, Handlebars y Socket.IO
Este proyecto es una aplicación web de gestión de productos para un estudio de arquitectura que se especializa en imagenes en 3 dimensionesque: que permite visualizar, agregar y eliminar productos en tiempo real utilizando Express, Handlebars, y Socket.IO. Los productos se almacenan en un archivo JSON y se muestran en vistas dinámicas con Handlebars. Los cambios se reflejan en tiempo real en una vista específica utilizando Socket.IO.

## Tecnologías utilizadas
- Node.js: Entorno de ejecución de JavaScript en el servidor.
- Express.js: Framework web para Node.js.
- Handlebars: Motor de plantillas para la generación de vistas dinámicas.
- Socket.IO: Biblioteca que permite la comunicación bidireccional en tiempo real entre cliente y servidor.
- File System: Utilizado para almacenar y gestionar los datos de los productos en archivos JSON.

## Funcionalidades
- Visualización de Productos: Muestra una lista de productos en la página principal.
- Agregado de Productos: Permite agregar nuevos productos desde un formulario en la vista realtimeproducts.
- Eliminación de Productos: Los productos pueden ser eliminados desde la vista realtimeproducts.
- Actualización en Tiempo Real: Las adiciones y eliminaciones de productos se reflejan automáticamente en todos los clientes conectados.

## Instalación
1. Clonar el repositorio: git clone https://github.com/tu-usuario/tu-repositorio.git
2. Abre una terminal en el directorio del proyecto
3. Instalar dependencias: npm install
4. Iniciar el servidor: npm run dev
5. Abrir el navegador y navegar a http://localhost:8000.

## Contribución
Las contribuciones son bienvenidas. Si encuentras un error o tienes alguna sugerencia, por favor abre un issue o envía un pull request.

## Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para obtener más información.