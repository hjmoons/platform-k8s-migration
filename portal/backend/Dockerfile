FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

ADD build/libs/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]