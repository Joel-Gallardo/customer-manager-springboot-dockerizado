#!/bin/bash
# Inicia el proceso de SQL Server en segundo plano
/opt/mssql/bin/sqlservr &

# Espera a que el servidor esté listo
# Podemos hacer esto esperando a que el puerto 1433 esté abierto o simplemente con una espera fija
sleep 30s

# Ejecuta el script de inicialización para crear la base de datos
# Usa la contraseña que se pasa como variable de entorno
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -i /usr/src/app/init.sql

# Mantenemos el contenedor en ejecución
wait