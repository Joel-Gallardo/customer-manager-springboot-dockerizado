# Usa Java 17 ligero
FROM eclipse-temurin:17-jdk-alpine

# argumento para el archivo JAR
# esta variable especifica la ruta y el nombre del archivo JAR que se generará al compilar el proyecto
ARG JAR_FILE=target/customermanager-0.0.1.jar

# Copia el archivo JAR al contenedor
COPY ${JAR_FILE} app_customermanager.jar

# Expone el puerto en el que corre Spring Boot para cuando se ejecute el contenedor
EXPOSE 8080

# Punto de entrada para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app_customermanager.jar"]