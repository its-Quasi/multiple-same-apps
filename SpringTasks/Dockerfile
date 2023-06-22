FROM eclipse-temurin:17-jdk-alpine
COPY "./target/springtasks.jar" "app.jar"
ADD target/springtasks.jar springtasks.jar
EXPOSE 8000
ENTRYPOINT ["java","-jar","app.jar"]