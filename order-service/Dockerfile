# ---------- Build stage ----------
FROM maven:3.9-eclipse-temurin-17 AS build

# Set working directory inside build container
WORKDIR /app

# Copy Maven descriptor + source
COPY pom.xml .
COPY src ./src

# Build the project (skip tests to be faster)
RUN mvn -B -DskipTests clean package

# ---------- Runtime stage ----------
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy the built jar from the build stage
# This will take whatever jar is in target/ and call it app.jar
COPY --from=build /app/target/*.jar app.jar

# Spring Boot / typical Java services listen on 8080 by default
EXPOSE 8080

# Start the service
ENTRYPOINT ["java", "-jar", "app.jar"]
