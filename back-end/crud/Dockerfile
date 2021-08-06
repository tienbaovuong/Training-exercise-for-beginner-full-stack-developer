FROM maven:3.8.1-jdk-11 AS MAVEN_BUILD

COPY pom.xml /build/
COPY src /build/src/
COPY target /build/target/
WORKDIR /build/
#RUN mvn package

FROM openjdk:11

WORKDIR /app

COPY --from=MAVEN_BUILD /build/target/crud-0.0.1-SNAPSHOT.jar /app/

ENTRYPOINT ["java", "-jar", "crud-0.0.1-SNAPSHOT.jar"]