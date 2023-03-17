FROM openjdk:17-alpine3.14
# copy the packaged jar file into our docker image
COPY ./facteur.jar /facteur.jar
COPY ./application.yml /resources/application.yml
COPY ./listing.csv /listing.csv

CMD ls -lrt
# set the startup command to execute the jar
CMD ["java", "-jar", "/facteur.jar", "--spring.config.location=/resources/application.yml"]


