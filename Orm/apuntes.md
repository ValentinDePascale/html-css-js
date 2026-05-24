## ORM (Object-Relational Mapping)
Cualquier lenguaje maneja objetos

Evita que los programadores eviten escribir codigo SQL, ORM esta estandarizado y es mas seguro para hacer las operaciones CRUD (Evitas SQL INYECTIONS). Siempre que se hagan
aplicaciones, se debe usar ORM.

Convertivos entidades (tablas) a objetos

### Ventajas
* **Seguridad:** Está estandarizado y es más seguro para realizar operaciones CRUD, ya que ayuda a evitar ataques de **SQL Injection**.
* **Abstracción:** Evita que los programadores tengan que escribir código SQL manualmente.
* **Conversión:** Convierte entidades (tablas) directamente en objetos de software.
* **Recomendación:** Siempre que se desarrollen aplicaciones modernas, se debe considerar el uso de un ORM.

### Desventajas
* **Rendimiento:** Puede ser menos eficiente que el SQL optimizado manualmente para tareas muy específicas.
* **Curva de aprendizaje:** Requiere tiempo para dominar el funcionamiento del ORM elegido.
* **Complejidad:** Algunas consultas muy complejas pueden ser difíciles de expresar a través de la sintaxis del ORM.

---

## SEQUELIZE (ORM para Node.js)

### Instalación

```bash
# Instalación básica
npm install sequelize

# Instalar el driver según la base de datos a utilizar:
npm install pg pg-hstore # PostgreSQL
npm install mysql2       # MySQL
npm install sqlite3      # SQLite
npm install tedious      # Microsoft SQL Server
```

---

Hay una separacion entre los datos y la aplicacion, esta bueno si se diseña la aplicacion q yo pueda tener muchas instancias (servidores) y acceder a la misma base,
xq la carga de trabajo es pesada y con un servidor no alcanza. Se puede separar los servicios de la BD. AWS para la BD. Microservicios, 1 servicio para 10 clientes,

### Definición de Modelos

Los modelos en Sequelize representan tablas en la base de datos. Osea, que primero si o si se deben tener creadas las tablas en la BD

**gt (mayor o igual que)**

**lt (menor o igual que)**

      age: {
        [Op.gte]: 18 // Operador mayor o igual que
      }

### Operaciones CRUD

Create user: recibe datos del usuario y lo crea
 User.create

Read:
 User.findAll();

Update:
 User.update

Se deben sincronizar las tablas para que los cambios en .js, se hagan en la BD. Un objeto ejemplo (User) va a corresponder a la tabla User

```javascript
sequilizez.sync()
```
### Migraciones

Modificar el esquema de la BD. Osea, modificar las tablas y sus relaciones (estructura). Archivos para crear, editar tablas.


```javascript
use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
```

A los archivos de migraciones, se les pone fecha, ya que normalmente, se hacen en distintas fechas, asi tiene un orden.

### Operaciones comunes de migracion


### Ejecutar Migraciones
```javascript
# Aplicar todas las migraciones pendientes
npx sequelize-cli db:migrate

# Revertir la última migración
npx sequelize-cli db:migrate:undo

# Revertir todas las migraciones
npx sequelize-cli db:migrate:undo:all

# Revertir hasta una migración específica
npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-users.js
```

## Semillas (Seeds)

Las semillas permiten plobar la base de datos con datos iniciales o de prueba. Ejemplo, crear un usuario administrador.

```javascript
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

# Ejecutar todas las semillas
npx sequelize-cli db:seed:all

# Revertir todas las semillas
npx sequelize-cli db:seed:undo:all
```


para facilitar el uso y no tener q escribir constantemente los ultimos comandos podemos agregar al package esto

```javascript
{
  "scripts": {
    "migrate": "sequelize-cli db:migrate",
    "migrate:undo": "sequelize-cli db:migrate:undo",
    "seed": "sequelize-cli db:seed:all",
    "seed:undo": "sequelize-cli db:seed:undo:all"
  }
}
```

