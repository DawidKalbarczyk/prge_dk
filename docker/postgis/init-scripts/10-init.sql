create extension postgis;
create extension pgrouting;

COPY /docker/postgis/init-scripts/ /docker-entrypoint-initdb.d/