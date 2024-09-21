# ProtektoPrueba
Prueba técnica para Protekto

## 1. Tecnologías Usadas
Se requiere instalación previa de las siguientes tecnologías para poder usar este proyecto.
- Node.js versión 20.5.0
- npm versión 10.8.2
- .Net versión 8.0.400
- PostgreSQL versión 16.3

## 2. Consideraciones Adicionales
Este proyecto fue configurado para correr en local por lo que el frontend debería quedar expuesto en `localhost:3000`.
Una vez se cuente con las tecnologías anteriormente mencionadas es necesario tener al menos una base de datos creada en Postgres y es necesario editar `appsettings.json` en el campo `WebApiDatabase` cambiando los campos:
- Database: En este campo debe ir el nombre de la base de datos que se va a usar.
- Username: Usuario de Postgres que pueda acceder a dicha base de datos.
- Password: Contraseña de la base de datos.

## 3. Pasos de Instalación y Ejecución
Desde el directorio del backend se deben correr los siguientes comandos Para instalar dependencias de Nuget, luego hacer las respectivas migraciones a la base de datos y correr el proyecto:
- `dotnet restore`
- `dotnet tool install --global dotnet-ef --version 8.*`
- `dotnet-ef database update`
- `dotnet run`
Desde el directorio del frontend se deben correr los siguientes comandos para instalar las despendencias de npm y correr el proyecto:
- `npm install`
- `npm start`
