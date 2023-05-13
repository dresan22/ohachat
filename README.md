# Aplicación Web de Mensajeria Efímera

El presente reto plantea desarrollar la capa gráfica necesaria para una aplicación web de mensajeria efímera,
donde se pueda interactuar entre usuarios siempre y cuando esten en línea, los mensajes no se almacenarán en base de
datos siendo solo visibles en la sesión actual (Es decir que al cerrar sesión o recargar la página estos desaparecen).

**Reglas de la Aplicación de Mensajeria**:

- Debes iniciar sesión para utilizar el servicio.
- Solo se puede enviar mensajes a los usuarios en línea.
- Los mensajes no estan guardados en base de datos, es decir que si se recarga la web estos desaparecen, incluso si
  el usuario está desconectado, nunca recibirá el mensaje (Por eso la condicional anterior).

## Desarrollo

Se requiere implementar el FrontEnd necesario para interactuar con los enpoints del backend de la aplicación web de mensajeria
efímera, dicho frontEnd debe cumplir con las siguientes reglas:

1. Estar desarrollado en React y TypeScript
2. Utilizar vite.js
3. Utilizar Tailwindcss.
4. Implementar patrones de diseño y estructuras en React.
5. Diseño responsitive.

Las interfaces de la aplicación se encuentran en el siguiente proyecto de figma: [Aplicación de Mensajeria](https://www.figma.com/file/YIf4cl25V8IkVwbW5j2U10/Prueba-T%C3%A9cnica-Oha?type=design&node-id=0%3A1&t=suJDLbMhT2Kwo2Mm-1).

### Flujo de la Aplicación

La página principal será la vista de login, permitiendo las opciones para iniciar sesión o registrarse, llevando a dicha vista.
Una vez el usuario valida sus credenciales, este accede a una vista protegida (Solo puedes acceder si iniciaste sesión) donde podrá
ver todos los usuarios en línea enviar y recibir mensajes.

### Conexión con el servicio del Backend

La conexión con la lógica de negocio de la aplicación es mediante dos protocolos:

- Para el inicio de sesión, registro, listado de usuarios y envio de mensajes se utiliza el protocolo `HTTP/HTTPS` implementando la arquitectura REST.
- Para la gestión de notificiaciones, donde se recibiran eventos en tiempo real, se utiliza el protocolo `WS`. Estos eventos que se pueden
  recibir son cambio de estado en línea (Usuario se conecta / Usuario se desconecta) y recibir mensajes.

**Nota**: La idea del websocket para el cambio de estado es no estar haciendo cada tanto tiempo una petición a la API, sino que
cada que un usuario inicie sesión, automáticamente recibir el evento.

#### Endpoints del Backend (API REST)

**URL base para API REST**: `https://api.chat.oha.services`
**Link de la documentación de Swagger**: [Documentación de la API](https://api.chat.oha.services/api/v1/swagger/)

**Nota**: El token de autenticación tiene una validez de 1 día.

1. `POST /api/v1/token/`

**Descripción**: Endpoint para el inicio de sesión.

|       Ruta       | Método |   Tipo de Medio    | Autenticación Requerida |
| :--------------: | :----: | :----------------: | :---------------------: |
| `/api/v1/token/` | `POST` | `application/json` |          `No`           |

**Cuerpo de la petición**:

|   Campo    |   Tipo   | Requerido | Descripción                    |
| :--------: | :------: | :-------: | ------------------------------ |
|  `email`   | `string` |   `Si`    | Correo electrónico del usuario |
| `password` | `string` |   `Si`    | Contraseña del usuario         |

**Respuesta**:

|    Campo     |   Tipo    | Descripción                                             |
| :----------: | :-------: | ------------------------------------------------------- |
|    `user`    | `object`  | Objeto con la información del usuario                   |
|   `token`    | `string`  | Token de autenticación                                  |
| `issued_at`  | `integer` | Fecha de emisión del token en formato unix timestamp    |
| `expires_at` | `integer` | Fecha de expiración del token en formato unix timestamp |

Objeto `user`:

|     Campo      |   Tipo   | Descripción                         |
| :------------: | :------: | ----------------------------------- |
|     `uuid`     | `string` | UUID del usuario                    |
|  `first_name`  | `string` | Nombre del usuario                  |
|  `last_name`   | `string` | Apellido del usuario                |
|    `email`     | `string` | Correo del usuario                  |
|   `is_staff`   | `string` | ¿Es administrador?                  |
| `is_superuser` | `string` | ¿Es superusuario?                   |
|  `is_active`   | `string` | ¿Está activo?                       |
|  `is_online`   | `string` | ¿Está en línea?                     |
|  `last_login`  | `string` | Último inicio de sesión del usuario |
|  `created_at`  | `string` | Fecha de creación del usuario       |
|  `updated_at`  | `string` | Fecha de actualización del usuario  |

2. `POST /api/v1/token/?create=true`

**Descripción**: Endpoint para el registro de usuarios. Notese que el endpoint es el mismo que el de inicio de sesión, pero con un parametro
adicional en la URL `create=true`.

|       Ruta       | Método |   Tipo de Medio    | Autenticación Requerida |
| :--------------: | :----: | :----------------: | :---------------------: |
| `/api/v1/token/` | `POST` | `application/json` |          `No`           |

**Cuerpo de la petición**:

|    Campo     |   Tipo   | Requerido | Descripción                    |
| :----------: | :------: | :-------: | ------------------------------ |
|   `email`    | `string` |   `Si`    | Correo electrónico del usuario |
|  `password`  | `string` |   `Si`    | Contraseña del usuario         |
| `first_name` | `string` |   `Si`    | Nombre del usuario             |
| `last_name`  | `string` |   `No`    | Apellido del usuario           |

**Respuesta**:

|    Campo     |   Tipo    | Descripción                                             |
| :----------: | :-------: | ------------------------------------------------------- |
|    `user`    | `object`  | Objeto con la información del usuario                   |
|   `token`    | `string`  | Token de autenticación                                  |
| `issued_at`  | `integer` | Fecha de emisión del token en formato unix timestamp    |
| `expires_at` | `integer` | Fecha de expiración del token en formato unix timestamp |

Objeto `user`:

|     Campo      |   Tipo   | Descripción                         |
| :------------: | :------: | ----------------------------------- |
|     `uuid`     | `string` | UUID del usuario                    |
|  `first_name`  | `string` | Nombre del usuario                  |
|  `last_name`   | `string` | Apellido del usuario                |
|    `email`     | `string` | Correo del usuario                  |
|   `is_staff`   | `string` | ¿Es administrador?                  |
| `is_superuser` | `string` | ¿Es superusuario?                   |
|  `is_active`   | `string` | ¿Está activo?                       |
|  `is_online`   | `string` | ¿Está en línea?                     |
|  `last_login`  | `string` | Último inicio de sesión del usuario |
|  `created_at`  | `string` | Fecha de creación del usuario       |
|  `updated_at`  | `string` | Fecha de actualización del usuario  |

3. `POST /api/v1/token/refresh/`

**Descripción**: Endpoint para refrescar el token de autenticación.

|           Ruta           | Método |   Tipo de Medio    | Autenticación Requerida |
| :----------------------: | :----: | :----------------: | :---------------------: |
| `/api/v1/token/refresh/` | `POST` | `application/json` |          `No`           |

**Cuerpo de la petición**:

|  Campo  |   Tipo   | Requerido | Descripción            |
| :-----: | :------: | :-------: | ---------------------- |
| `token` | `string` |   `Si`    | Token de autenticación |

**Respuesta**:

|    Campo     |   Tipo    | Descripción                                             |
| :----------: | :-------: | ------------------------------------------------------- |
|    `user`    | `object`  | Objeto con la información del usuario                   |
|   `token`    | `string`  | Token de autenticación                                  |
| `issued_at`  | `integer` | Fecha de emisión del token en formato unix timestamp    |
| `expires_at` | `integer` | Fecha de expiración del token en formato unix timestamp |

Objeto `user`:

|     Campo      |   Tipo   | Descripción                         |
| :------------: | :------: | ----------------------------------- |
|     `uuid`     | `string` | UUID del usuario                    |
|  `first_name`  | `string` | Nombre del usuario                  |
|  `last_name`   | `string` | Apellido del usuario                |
|    `email`     | `string` | Correo del usuario                  |
|   `is_staff`   | `string` | ¿Es administrador?                  |
| `is_superuser` | `string` | ¿Es superusuario?                   |
|  `is_active`   | `string` | ¿Está activo?                       |
|  `is_online`   | `string` | ¿Está en línea?                     |
|  `last_login`  | `string` | Último inicio de sesión del usuario |
|  `created_at`  | `string` | Fecha de creación del usuario       |
|  `updated_at`  | `string` | Fecha de actualización del usuario  |

4. `GET /api/v1/users/`

**Descripción**: Endpoint para obtener la lista de usuarios.

|      Ruta       | Método |   Tipo de Medio    | Autenticación Requerida |
| :-------------: | :----: | :----------------: | :---------------------: |
| `/api/v1/users` | `GET`  | `application/json` |          `Si`           |

**Parámetros de la petición**:

|    Campo    |   Tipo   | Requerido | Descripción                                          |
| :---------: | :------: | :-------: | ---------------------------------------------------- |
|  `search`   | `string` |   `No`    | Búsqueda por nombre o correo electrónico del usuario |
| `is_active` | `string` |   `No`    | Filtrar por usuarios activos                         |
| `is_online` | `string` |   `No`    | Filtrar por usuarios en línea                        |
| `page_size` | `string` |   `No`    | Tamaño de la página de resultados                    |
|   `page`    | `string` |   `No`    | Página de resultados                                 |
| `ordering`  | `string` |   `No`    | Ordenamiento de resultados                           |

**Respuesta**:

|   Campo    |     Tipo      | Descripción                              |
| :--------: | :-----------: | ---------------------------------------- |
|  `count`   |   `integer`   | Cantidad de usuarios                     |
|   `next`   | `string/null` | URL de la siguiente página de resultados |
| `previous` | `string/null` | URL de la página anterior de resultados  |
| `results`  |    `list`     | Lista de usuarios                        |

Objeto `user`:

|     Campo      |   Tipo   | Descripción                         |
| :------------: | :------: | ----------------------------------- |
|     `uuid`     | `string` | UUID del usuario                    |
|  `first_name`  | `string` | Nombre del usuario                  |
|  `last_name`   | `string` | Apellido del usuario                |
|    `email`     | `string` | Correo del usuario                  |
|   `is_staff`   | `string` | ¿Es administrador?                  |
| `is_superuser` | `string` | ¿Es superusuario?                   |
|  `is_active`   | `string` | ¿Está activo?                       |
|  `is_online`   | `string` | ¿Está en línea?                     |
|  `last_login`  | `string` | Último inicio de sesión del usuario |
|  `created_at`  | `string` | Fecha de creación del usuario       |
|  `updated_at`  | `string` | Fecha de actualización del usuario  |

5. `GET /api/v1/users/{uuid}/`

**Descripción**: Endpoint para obtener la información de un usuario.

|          Ruta          | Método |   Tipo de Medio    | Autenticación Requerida |
| :--------------------: | :----: | :----------------: | :---------------------: |
| `/api/v1/users/{uuid}` | `GET`  | `application/json` |          `Si`           |

**Respuesta**:

|     Campo      |   Tipo   | Descripción                         |
| :------------: | :------: | ----------------------------------- |
|     `uuid`     | `string` | UUID del usuario                    |
|  `first_name`  | `string` | Nombre del usuario                  |
|  `last_name`   | `string` | Apellido del usuario                |
|    `email`     | `string` | Correo del usuario                  |
|   `is_staff`   | `string` | ¿Es administrador?                  |
| `is_superuser` | `string` | ¿Es superusuario?                   |
|  `is_active`   | `string` | ¿Está activo?                       |
|  `is_online`   | `string` | ¿Está en línea?                     |
|  `last_login`  | `string` | Último inicio de sesión del usuario |
|  `created_at`  | `string` | Fecha de creación del usuario       |
|  `updated_at`  | `string` | Fecha de actualización del usuario  |

6. `POST /api/v1/users/{uuid}/send-message/`

**Descripción**: Endpoint para enviar un mensaje a un usuario.

|                 Ruta                 | Método |   Tipo de Medio    | Autenticación Requerida |
| :----------------------------------: | :----: | :----------------: | :---------------------: |
| `/api/v1/users/{uuid}/send-message/` | `POST` | `application/json` |          `Si`           |

**Cuerpo de la petición**:

|   Campo   |   Tipo   | Requerido | Descripción           |
| :-------: | :------: | :-------: | --------------------- |
| `content` | `string` |   `Si`    | Contenido del mensaje |

**Respuesta**:

|    Campo     |   Tipo   | Descripción                             |
| :----------: | :------: | --------------------------------------- |
|    `uuid`    | `string` | UUID del mensaje                        |
|  `content`   | `string` | Contenido del mensaje                   |
| `created_at` | `string` | Fecha de creación del mensaje           |
|   `sender`   | `object` | Objeto del usuario que envió el mensaje |

Objeto `sender`:

|     Campo      |   Tipo   | Descripción                         |
| :------------: | :------: | ----------------------------------- |
|     `uuid`     | `string` | UUID del usuario                    |
|  `first_name`  | `string` | Nombre del usuario                  |
|  `last_name`   | `string` | Apellido del usuario                |
|    `email`     | `string` | Correo del usuario                  |
|   `is_staff`   | `string` | ¿Es administrador?                  |
| `is_superuser` | `string` | ¿Es superusuario?                   |
|  `is_active`   | `string` | ¿Está activo?                       |
|  `is_online`   | `string` | ¿Está en línea?                     |
|  `last_login`  | `string` | Último inicio de sesión del usuario |
|  `created_at`  | `string` | Fecha de creación del usuario       |
|  `updated_at`  | `string` | Fecha de actualización del usuario  |

### Endpoints del Backend (Websocket)

**URL base para Websocket**: `wss://api.chat.oha.services`

1. `/ws/v1/users/{uuid}/notifications/`

**Descripción**: Endpoint para recibir notificaciones de mensajes nuevos.

**Parámetros de la URL**:

|  Campo  |   Tipo   | Requerido | Descripción            |
| :-----: | :------: | :-------: | ---------------------- |
| `token` | `string` |   `Si`    | Token de autenticación |

**Consideraciones**:

- El token de autenticación se obtiene en el endpoint `POST /api/v1/auth/login/`.

- Solo se puede conectar al websocket del usuario relacionado con el token de autenticación.

- Para la conexión mediante react, podría utilizar la librería [react-use-websocket](https://www.npmjs.com/package/react-use-websocket)

```ts
useWebSocket(
	`${BACKEND_WS_BASE}/ws/v1/users/${user.uuid}/notifications/?token=${token}`,
	{
		onOpen: () => getUsers(),
		souldReconnect: (closeEvent) => true,
		onMessage: (event) => {
			const data = JSON.parse(event.data);
			console.log(data);
		},
		onError: (event) => console.log(event),
	}
);
```

#### Tipos de Eventos

1. `user-presence`

**Descripción**: Evento que se envía cuando un usuario se conecta o desconecta.

**Estructura del evento**:

| Campo  |   Tipo   | Descripción      |
| :----: | :------: | ---------------- |
| `type` | `string` | Tipo de evento   |
| `data` | `object` | Datos del evento |

Objeto `data`:

|     Campo      |   Tipo   | Descripción                         |
| :------------: | :------: | ----------------------------------- |
|     `uuid`     | `string` | UUID del usuario                    |
|  `first_name`  | `string` | Nombre del usuario                  |
|  `last_name`   | `string` | Apellido del usuario                |
|    `email`     | `string` | Correo del usuario                  |
|   `is_staff`   | `string` | ¿Es administrador?                  |
| `is_superuser` | `string` | ¿Es superusuario?                   |
|  `is_active`   | `string` | ¿Está activo?                       |
|  `is_online`   | `string` | ¿Está en línea?                     |
|  `last_login`  | `string` | Último inicio de sesión del usuario |
|  `created_at`  | `string` | Fecha de creación del usuario       |
|  `updated_at`  | `string` | Fecha de actualización del usuario  |

2. `new-message`

**Descripción**: Evento que se envía cuando un usuario recibe un nuevo mensaje.

**Estructura del evento**:

| Campo  |   Tipo   | Descripción      |
| :----: | :------: | ---------------- |
| `type` | `string` | Tipo de evento   |
| `data` | `object` | Datos del evento |

Objeto `data`:

|    Campo     |   Tipo   | Descripción                             |
| :----------: | :------: | --------------------------------------- |
|    `uuid`    | `string` | UUID del mensaje                        |
|  `content`   | `string` | Contenido del mensaje                   |
| `created_at` | `string` | Fecha de creación del mensaje           |
|   `sender`   | `object` | Objeto del usuario que envió el mensaje |

Objeto `sender`:

|     Campo      |   Tipo   | Descripción                         |
| :------------: | :------: | ----------------------------------- |
|     `uuid`     | `string` | UUID del usuario                    |
|  `first_name`  | `string` | Nombre del usuario                  |
|  `last_name`   | `string` | Apellido del usuario                |
|    `email`     | `string` | Correo del usuario                  |
|   `is_staff`   | `string` | ¿Es administrador?                  |
| `is_superuser` | `string` | ¿Es superusuario?                   |
|  `is_active`   | `string` | ¿Está activo?                       |
|  `is_online`   | `string` | ¿Está en línea?                     |
|  `last_login`  | `string` | Último inicio de sesión del usuario |
|  `created_at`  | `string` | Fecha de creación del usuario       |
|  `updated_at`  | `string` | Fecha de actualización del usuario  |

### Consideraciones Finales

- El proyecto debe estar en un repositorio de Github, Gitlab o Bitbucket. El propoósito de esto es que podamos ver el historial de commits y la evolución del proyecto. No es necesario que sea público, puede ser privado y agregarnos como colaboradores.

- El código debe estar documentado y comentado en inglés.

- El código te pertenece, por lo que puedes hacer lo que quieras con él. Recuerda que el propósito de este proyecto es evaluar tus habilidades como desarrollador.

- Si tienes alguna duda, no dudes en contactarnos.

### ¿Cómo entregar el proyecto?

- Sube el proyecto a un repositorio de Github, Gitlab o Bitbucket.
- Sube el proyecto a vercel, netlify o algún otro servicio de hosting.
- Envíanos el link del repositorio y el link del proyecto en producción.

### ¿Cómo evaluaremos el proyecto?

- Cumplimiento de los requerimientos.
- Calidad del código.
- Buenas prácticas de desarrollo.
- Buenas prácticas de documentación.
- Buenas prácticas de diseño.
- Buenas prácticas de seguridad.
- Buenas prácticas de usabilidad.
