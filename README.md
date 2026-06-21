# Suite de Automatización — Proyecto Final de Testing Funcional

Suite de 20 casos de prueba automatizados con [Playwright](https://playwright.dev/), implementada como Entregable 2 del proyecto.

## Cambio de sistema bajo prueba

El plan original era automatizar 20 de los 40 casos funcionales diseñados para demo.nopcommerce.com (ver Entregable 1). Al intentar ejecutar la suite, se determinó que ese sitio está protegido por un servicio de detección de bots (Cloudflare) que bloquea herramientas de automatización de navegador, incluyendo Playwright.

Siguiendo la indicación de la cátedra, se utilizó como plataforma sustituta **[practicesoftwaretesting.com](https://practicesoftwaretesting.com)** ("Toolshop"), una aplicación desarrollada específicamente para la práctica de testing y automatización. Toolshop es funcionalmente distinta a demo.nopcommerce.com, por lo que los 20 casos de esta suite son un conjunto independiente, diseñado para demostrar competencias de automatización (UI y API, incluyendo validación de control de acceso por rol) sobre la plataforma indicada. El detalle completo y la justificación de cada caso están en la sección 4 del Entregable 1.

## Casos de prueba

| ID | Caso | Archivo |
|---|---|---|
| TS-01 | Iniciar sesión con credenciales válidas | `auth.spec.js` |
| TS-02 | Rechazar login con contraseña incorrecta | `auth.spec.js` |
| TS-03 | Acceder a la sección de cuenta autenticada | `auth.spec.js` |
| TS-04 | Registrar un nuevo usuario | `auth.spec.js` |
| TS-05 | El sistema bloquea el acceso de un cliente al panel de administración | `auth.spec.js` |
| TS-06 | Listar productos por categoría | `catalogo.spec.js` |
| TS-07 | Ver detalle de producto | `catalogo.spec.js` |
| TS-08 | Buscar producto por nombre | `catalogo.spec.js` |
| TS-09 | Buscar producto inexistente | `catalogo.spec.js` |
| TS-10 | Verificar que el sistema recibe el formulario de contacto | `contacto.spec.js` |
| TS-11 | El sistema rechaza email inválido en formulario de contacto | `contacto.spec.js` |
| TS-12 | Agregar un producto al carrito | `carrito.spec.js` |
| TS-13 | Eliminar un producto del carrito | `carrito.spec.js` |
| TS-14 | Comprobar si existe límite máximo de cantidad para un producto dado | `carrito.spec.js` |
| TS-15 | Iniciar sesión vía API | `api.spec.js` |
| TS-16 | Registrar usuario vía API | `api.spec.js` |
| TS-17 | Verificar que el sistema rechaza el acceso a un endpoint sin token | `api.spec.js` |
| TS-18 | Listar marcas sin token vía API | `api.spec.js` |
| TS-19 | Crear una marca como administrador | `admin.spec.js` |
| TS-20 | El sistema bloquea la eliminación de una marca por parte de un cliente | `api.spec.js` |

Cuentas de prueba públicas del entorno: `admin@practicesoftwaretesting.com` (rol administrador) y `customer@practicesoftwaretesting.com` (rol cliente), ambas con contraseña `welcome01`.

## Instalación y ejecución

```
npm install
npx playwright install
npx playwright test
```

Ver el reporte de la última ejecución (capturas, video y trace por cada caso):

```
npx playwright show-report
```
