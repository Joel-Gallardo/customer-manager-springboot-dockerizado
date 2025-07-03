# Customer Manager - Spring Boot & Docker

[![Java](https://img.shields.io/badge/Java-17-blue.svg)](https://www.java.com)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.5-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Maven](https://img.shields.io/badge/Maven-3.9-orange.svg)](https://maven.apache.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Una aplicación web robusta construida con **Spring Boot** para la gestión de clientes. Ofrece una API RESTful completa y una interfaz de usuario básica. El proyecto está completamente **dockerizado**, permitiendo un despliegue y configuración sencillos y aislados usando Docker Compose.

---

## 📋 Tabla de Contenidos

1.  [**Sobre el Proyecto**](#-sobre-el-proyecto)
2.  [**Características Principales**](#-características-principales)
3.  [**Stack**](#-stack)
4.  [**Start**](#-Start)
    *   [Prerrequisitos](#prerrequisitos)
    *   [Instalación](#instalación)
5.  [**Uso**](#-uso)
    *   [Opción 1: Ejecución Local](#opción-1-ejecución-local)
    *   [Opción 2: Ejecución con Docker (Recomendado)](#opción-2-ejecución-con-docker-recomendado)
6.  [**Configuración**](#-configuración)
    *   [Variables de Entorno Locales](#variables-de-entorno-locales)
    *   [Variables de Entorno de Docker](#variables-de-entorno-de-docker)
7.  [**Puntos de Acceso de la API (Endpoints)**](#-puntos-de-acceso-de-la-api-endpoints)
8.  [**Estructura del Proyecto**](#-estructura-del-proyecto)
9.  [**Contribuciones**](#-contribuciones)
10. [**Licencia**](#-licencia)

---

## 🌎 Sobre el Proyecto

**Customer Manager** es una aplicación que demuestra la implementación de un sistema CRUD (Crear, Leer, Actualizar, Eliminar) utilizando un stack moderno de Java. El backend expone una API REST para gestionar clientes y el frontend (alojado en `resources/static`) consume esta API.

El proyecto está diseñado para ser fácil de configurar y desplegar gracias a su integración con Docker, que orquesta tanto el contenedor de la aplicación como el de la base de datos SQL Server.

---

## ✨ Características Principales

-   **API RESTful**: Endpoints bien definidos para operaciones CRUD sobre la entidad `Customer`.
-   **Integración con Base de Datos**: Conexión y persistencia de datos con **Microsoft SQL Server**.
-   **Contenedorización**: Entorno listo para producción con `Dockerfile` y `docker-compose.yml`.
-   **Gestión de Dependencias**: Manejado eficientemente con **Maven**.
-   **Frontend Básico**: Interfaz de usuario simple para interactuar con la API.

---

## 🛠️ Stack

-   **Backend**: Spring Boot, Spring Web, Spring Data JPA
-   **Base de Datos**: Microsoft SQL Server
-   **Lenguaje**: Java 17
-   **Build Tool**: Maven
-   **Contenedorización**: Docker & Docker Compose

---

## 🚀 Start

Sigue estas instrucciones para obtener una copia del proyecto y ejecutarla en tu máquina.

### Prerrequisitos

Asegúrate de tener instalado el siguiente software:

-   [JDK 17](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html) o superior
-   [Apache Maven](https://maven.apache.org/download.cgi) 3.6+
-   [Git](https://git-scm.com/)
-   [Docker](https://www.docker.com/products/docker-desktop) y [Docker Compose](https://docs.docker.com/compose/install/) (requerido para la opción de Docker)

### Instalación

Clona el repositorio en tu máquina local:

```bash
git clone https://github.com/Joel-Gallardo/customer-manager-springboot-dockerizado.git
cd customer-manager-springboot-dockerizado
```
---

## ⚙️ Uso

Puedes ejecutar la aplicación de dos maneras: localmente o usando Docker.

### Opción 1: Ejecución Local

Esta opción requiere que tengas una instancia de SQL Server accesible localmente.

1.  **Configurar la Base de Datos**:
    Asegúrate de que tu instancia de SQL Server esté en ejecución y que la base de datos que deseas usar ya exista. Hibernate se encargará de crear las tablas automáticamente.

2.  **Configurar Variables de Entorno**:
    Dentro de la carpeta raíz del proyecto Spring Boot (`./customermanager`), crea un archivo `.env` con las credenciales de tu base de datos. Puedes usar el siguiente template:

    ```env
    # .env
    SPRING_DATASOURCE_URL=jdbc:sqlserver://localhost:1433;databaseName=customerdb;encrypt=false;trustServerCertificate=true;
    SPRING_DATASOURCE_USERNAME=sa
    SPRING_DATASOURCE_PASSWORD=YourStrong!Password
    ```

3.  **Ejecutar la Aplicación**:
    Utiliza el wrapper de Maven para iniciar la aplicación:

    ```bash
    # Desde la carpeta ./customermanager
    ./mvnw spring-boot:run
    ```

La aplicación estará disponible en `http://localhost:8080`.

### Opción 2: Ejecución con Docker (Recomendado)

Este método es más sencillo ya que Docker gestiona tanto la aplicación como la base de datos.

1.  **Construir el Paquete de la Aplicación (.jar)**:
    Desde la carpeta raíz del módulo Spring Boot (`./customermanager`), genera el archivo `.jar` ejecutable.

    ```bash
    # Desde la carpeta ./customermanager
    ./mvnw clean install -DskipTests
    ```
    Esto creará el archivo JAR en el directorio `./customermanager/target/`.

2.  **Levantar los Contenedores con Docker Compose**:
    Vuelve a la carpeta raíz del proyecto (donde se encuentra `docker-compose.yml`) y ejecuta el siguiente comando:

    ```bash
    # Desde la raíz del proyecto
    docker-compose up --build
    ```
    Este comando hará lo siguiente:
    -   Construirá la imagen de la aplicación Spring Boot usando su `Dockerfile`.
    -   Construirá la imagen de la base de datos SQL Server usando `Dockerfile.database`.
    -   Creará e iniciará los contenedores para la app y la base de datos, conectándolos en la misma red.

La aplicación estará disponible en `http://localhost:8080`.

3.  **Para detener y eliminar los contenedores**:

    ```bash
    docker-compose down
    ```

---

## 🔧 Configuración

### Variables de Entorno Locales

Utilizadas en el archivo `.env` para la ejecución local.

| Variable                   | Descripción                                                    |
| -------------------------- | -------------------------------------------------------------- |
| `SPRING_DATASOURCE_URL`    | La URL de conexión JDBC para tu instancia de SQL Server.       |
| `SPRING_DATASOURCE_USERNAME` | El nombre de usuario para acceder a la base de datos.          |
| `SPRING_DATASOURCE_PASSWORD` | La contraseña para el usuario de la base de datos.             |

### Variables de Entorno de Docker

Configuradas en el archivo `docker-compose.yml` para el entorno contenedorizado.

| Variable        | Servicio    | Descripción                                            |
| --------------- | ----------- | ------------------------------------------------------ |
| `SPRING_PROFILES_ACTIVE` | `app`       | Activa el perfil `docker` de Spring para la conexión a la BD. |
| `ACCEPT_EULA`   | `db`        | Acepta el acuerdo de licencia de SQL Server.           |
| `SA_PASSWORD`   | `db`        | Define la contraseña para el usuario `sa` de SQL Server. |
| `DB_NAME`       | `db`        | Nombre de la base de datos a crear.                    |

---

## 📡 Puntos de Acceso de la API (Endpoints)

La API sigue las convenciones REST estándar para la gestión de clientes. La URL base es `/api/customers`.

| Método HTTP | Endpoint                  | Descripción                      |
| ----------- | ------------------------- | -------------------------------- |
| `GET`       | `/`                       | Recupera una lista de todos los clientes. |
| `GET`       | `/{id}`                   | Obtiene un cliente por su ID.    |
| `POST`      | `/`                       | Crea un nuevo cliente.           |
| `PUT`       | `/{id}`                   | Actualiza un cliente existente.  |
| `DELETE`    | `/{id}`                   | Elimina un cliente por su ID.    |

---

## 📂 Estructura del Proyecto
```bash
customer-manager-springboot-dockerizado/
├── customermanager/ # Módulo principal de Spring Boot
│ ├── src/
│ │ ├── main/
│ │ │ ├── java/ # Código fuente de la aplicación
│ │ │ └── resources/
│ │ │ ├── static/ # Archivos del frontend (HTML, CSS, JS)
│ │ │ └── application.yml # Configuración base de Spring
│ ├── pom.xml # Dependencias y build de Maven
│ └── Dockerfile # Instrucciones para construir la imagen de la app
│
├── .gitignore
├── docker-compose.yml # Orquesta los contenedores de la app y la BD
├── Dockerfile.database # Instrucciones para la imagen de SQL Server
└── README.md # Este archivo
```

---

## 🤝 Contribuciones

Las contribuciones son lo que hace que la comunidad de código abierto sea un lugar increíble para aprender, inspirar y crear. Cualquier contribución que hagas será **muy apreciada**.

1.  Haz un Fork del proyecto.
2.  Crea tu Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Haz Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`).
4.  Haz Push a la Branch (`git push origin feature/AmazingFeature`).
5.  Abre una Pull Request.

---




