# FINANCE APP BACKEND
![GitHub Actions](https://github.com/viictrp/finance-app-backend/actions/workflows/build.yml/badge.svg) ![Docker Image](https://github.com/viictrp/finance-app-backend/actions/workflows/docker-image.yml/badge.svg)
API for Finance App

## Building the application

    docker build --tag finance-app-server-node -f ./Dockerfile .

## Running the application

> Before running the application in Docker, you must run docker compose on `docker-compose.yml`.
> This will run all the dependencies for this application to start.

Now you can run the docker image you have built

    docker run -p 8080:8080 -e PORT=8080 -e DATABASE_URL='postgresql://postgres:z8D6D26nReSH1RQb4VdU@postgres.app:6787/finance-app-database?schema=finance-app' -e JWT_SECRET=LOCAL_SECRET -e TOKEN_HEADER_KEY='x-authentication-token' finance-app-server-node

To verify if the API is UP go to `http://localhost:8080/actuator/health`

## API Documentation

The Swagger of this application can be found at <br>

#### `http://localhost:8080/swagger-ui.html`
