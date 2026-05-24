# Repaso: Arquitectura MVC y Validación de Datos

Este documento resume los conceptos clave sobre el patrón de diseño MVC, la estructuración de aplicaciones y la importancia de la validación en el desarrollo de software.

## 1. El Sistema MVC (Model-View-Controller)

El patrón MVC divide la aplicación en tres componentes principales para separar las responsabilidades:

* **View (Vista):** Es la interfaz con la que el usuario interactúa. Se encarga de la presentación de los datos.
* **Controller (Controlador):** Contiene la lógica de negocio. Actúa como intermediario entre la Vista y el Modelo, procesando las entradas del usuario.
* **Model (Modelo):** Representa la estructura de los datos y la interacción con la base de datos.

### Flujo de Comunicación
El flujo típico de una solicitud en una aplicación estructurada sigue este camino:

**Cliente (Navegador) ↔ Controlador (Lógica) ↔ Servicio (Cuándo llamar al modelo) ↔ Modelo (Base de Datos)**



## 2. Escalabilidad y Mantenimiento

A medida que una aplicación crece, mantener la lógica de negocio se vuelve más complejo. Una buena estructuración permite:
* **Mejorar los testeos:** Al separar responsabilidades, es más fácil probar cada parte de forma aislada.
* **Reutilizar código:** Los servicios y modelos pueden ser llamados desde distintos controladores.
* **Separación de intereses:** Los controladores se limitan a recibir el *request* y enviar el *response*, delegando la lógica pesada a otras capas.

## 3. Validación de Datos

La validación asegura que los datos que ingresan al sistema sean correctos y seguros.

### Validación en el Frontend vs. Backend
* **Frontend:** Mejora la experiencia del usuario (UX) al avisar instantáneamente si falta un dato o si el formato es incorrecto.
* **Backend:** Es la validación **crítica**. No se debe confiar únicamente en el Front, ya que un atacante puede saltarse la interfaz e interactuar directamente con la API.
* **Base de Datos:** Siempre se deben agregar restricciones (constraints) a nivel de esquema para asegurar la integridad final.

### Importancia de la Validación (Seguridad)
Validar correctamente ayuda a evitar:
1.  **Inyección de código malicioso (SQL Injection).**
2.  **Desbordamiento de búfer (Buffer Overflow).**
3.  **Ataques de Denegación de Servicio (DoS).**
4.  **Acceso no autorizado.**

## 4. Uso de JOI

**Joi** es una biblioteca de validación de esquemas para JavaScript que permite describir la estructura de los datos de forma sencilla y potente.

### Flujo Típico de Validación en el Backend:
1.  **Definir esquemas:** Crear las reglas de validación (campos obligatorios, tipos de datos).
2.  **Crear Middleware:** Implementar una función que aplique estos esquemas antes de la lógica principal.
3.  **Aplicar Middleware:** Colocar la validación justo antes de los métodos del controlador.
4.  **Manejar Errores:** Capturar fallos y devolver una respuesta clara.
5.  **Procesar Solicitud:** Solo si los datos son válidos, se ejecuta la operación.

## 5. Ejemplo de Implementación (Product Validator)

```javascript
// validators/productValidator.js
const Joi = require('joi');

const productSchema = {
    create: Joi.object({
        name: Joi.string().required().min(3).max(100),
        description: Joi.string().required().min(10),
        price: Joi.number().required().min(0),
        category: Joi.string().required(),
        stock: Joi.number().integer().min(0).default(0),
        images: Joi.array().items(Joi.string().uri())
    }),

    update: Joi.object({
        name: Joi.string().min(3).max(100),
        description: Joi.string().min(10),
        price: Joi.number().min(0),
        category: Joi.string(),
        stock: Joi.number().integer().min(0),
        images: Joi.array().items(Joi.string().uri())
    })
};

module.exports = productSchema;