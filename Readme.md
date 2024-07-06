# Proyecto Cartera Grupo Empresarial Multired/Servired

## Descripción
 - Este proyecto es una aplicación web que permite gestionar la cartera del Grupo Empresarial Multired/Servired.
es un proyecto de codigo abierto que se encuentra en el repositorio de GitHub. y utilizamos librerias open source.

## Infraestructura

- Api: 
  - Lenguaje: TypeScript
  - Framework: Express
  - Base de datos: MySQL 8.2
  - Servidor: Interno (Empresarial)
  - Repositorio: https://github.com/llOrtegall/proyect_cartera/api
  - Librerias: Cors, Dotenv, Express, Mysql2, Nodemon, Typescript, Sequalize

- Frontend:
  - Lenguaje: TypeScript
  - Framework: React
  - Servidor: Interno (Empresarial)
  - Repositorio:https://github.com/llOrtegall/proyect_cartera/client
  - Librerias: Axios, React, React-dom, React-router-dom, Typescript, xslx, sonner, tailwindcss, remixicon, tremor, headlessui/react, 

## Instalación

- Api: 
  - Definir las variables de entorno en el archivo .env (ver archivo .env.example)
  - Ejecutar el comando para instalar las dependencias dentro de la carpeta api
  ```
    npm install || yarn
  ```
  - Ejecutar el comando para compilar el proyecto
  ```
    npm run build || yarn build
  ```

  * Esto generará una carpeta dist con el código compilado dentro de api, la cual ya esta configurada en el archivo docker-compose.yml en la raiz del proyecto. y el cual se encargara de levantar el contenedor con la imagen de nodejs y ejecutar el comando npm start para levantar el servidor.

- Frontend:
  - Definir las variables de entorno en el archivo .env (ver archivo .env.example)
  - Ejecutar el comando para instalar las dependencias dentro de la carpeta client
  ```
    npm install || yarn
  ```
  - Ejecutar el comando para compilar el proyecto
  ```
    npm run build || yarn build
  ```

  * Esto generará una carpeta build con el código compilado dentro de client, la cual ya esta configurada en el archivo docker-compose.yml en la raiz del proyecto. y el cual se encargara de levantar el contenedor con la imagen de nginx y copiar el contenido de la carpeta build dentro de la carpeta /usr/share/nginx/html/ para servir la aplicación web.

- config
  - En el archivo docker-compose.yml se encuentran las configuraciones de los volumenes que se levantarán para la aplicación web de nginx se deja como schema una config ya determinada.

## Uso
  - Para levantar la aplicación se debe ejecutar el comando
  ```
    docker-compose up
  ```
  - La aplicación estará disponible en la dirección http://localhost:8080
  - La api estará disponible en la dirección http://localhost:3000 por defecto pero esto dependerá de la configuración las variables de entorno dentro de api.

  - Recordar que el client en el archivo App.tsx se encuentra la url de la api que se debe cambiar si se cambia la dirección de la api.
