FROM openjdk:11
#VOLUME /tmp
ARG JAR_FILE=target/*.jar
COPY target/crud-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
#ENTRYPOINT exec java $JAVA_OPTS -jar crud.jar
# For Spring-Boot project, use the entrypoint below to reduce Tomcat startup time.
#ENTRYPOINT exec java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar crud.jar
ENTRYPOINT ["java","-jar","/app.jar"]