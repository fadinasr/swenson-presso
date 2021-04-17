# Swenson He Coding Challenge for Senior Backend Developer Position
A client is building an e-commerce mobile application for their line of coffee machines and custom coffee pods; they are looking to have two screens: one screen to display coffee machines and one screen to display coffee pods. On the coffee machines screen, the user may filter by product type and water line. On the coffee pods screen, the user may filter by product type, coffee flavor, and pack size. This repo is to simulate this environment with an API that returns the data for these two screens.

A few things to note in the project:
* **[Github Actions Workflows](https://github.com/fadinasr/swenson-presso/tree/master/.github/workflows)** - Pre-configured Github Actions to run automated builds and publish image to Github Packages
* **[Dockerfile](https://github.com/fadinasr/swenson-presso/blob/master/Dockerfile)** - Dockerfile to generate docker builds.
* **[docker-compose](https://github.com/fadinasr/swenson-presso/blob/master/docker-compose.yml)** - Docker compose script to start service in production mode.
* **[Containerized Mongo for development](#development)** - Starts a local mongo container with data persistence across runs.
* **[Safe Mongooose Connection Helper](https://github.com/fadinasr/swenson-presso/blob/master/src/lib/safe-mongoose-connection.ts)** - A helper class to connect with Mongoose reliably.
* **Joi** - For declarative payload validation
* **[Middleware for easier async/await](https://github.com/fadinasr/swenson-presso/blob/master/src/middleware/request-middleware.ts)** - Catches errors from routes and throws them to express error handler to prevent app crash due to uncaught errors.
* **[OpenAPI 3.0 Spec](https://github.com/fadinasr/swenson-presso/blob/master/openapi.json)** - A starter template to get started with API documentation using OpenAPI 3.0. This API spec is also available when running the development server at `http://localhost:3000/dev/api-docs`
* **[.env file for configuration](#environment)** - Change server config like app port, mongo url etc
* **[Winston Logger](#logging)** - Uses winston as the logger for the application.
* **ESLINT** - ESLINT is configured for linting.
* **Jest** - Using Jest for running test cases

## I. Installation

### Quick Method

#### 1. Clone this repo

```
$ git clone git@github.com:fadinasr/swenson-presso.git
$ cd swenson-presso
```

#### 2. Install dependencies

```
$ npm install
```

## II. Configuration

#### Update Docker repository for actions
```
$ npm run setup-actions
```

## III. Development

### Start dev server
Starting the dev server also starts MongoDB as a service in a docker container using the compose script at `docker-compose.dev.yml`.

```
$ npm run dev
```
Running the above commands results in 
* 🌏**API Server** running at `http://localhost:3000`
* ⚙️**Swagger UI** at `http://localhost:3000/api/dev/api-docs`
* 🛢️**MongoDB** running at `mongodb://localhost:27017`

## IV. Packaging and Deployment

The mongo container is only only available in dev environment. When you build and deploy the docker image, be sure to provide the correct **[environment variables](#environment)**.

#### 1. Build and run without Docker

```
$ npm run build && npm run start
```

#### 2. Run with docker

```
$ docker build -t api-server .
$ docker run -t -i \
      --env NODE_ENV=production \
      --env MONGO_URL=mongodb://host.docker.internal:27017/books \
      -p 3000:3000 \
      api-server
```

#### 3. Run with docker-compose

```
$ docker-compose up
```


---

## Environment
To edit environment variables, create a file with name `.env` and copy the contents from `.env.default` to start with.

| Var Name  | Type  | Default | Description  |
|---|---|---|---|
| NODE_ENV  | string  | `development` |API runtime environment. eg: `staging`  |
|  PORT | number  | `3000` | Port to run the API server on |
|  MONGO_URL | string  | `mongodb://localhost:27017/books` | URL for MongoDB |

## Logging
The application uses [winston](https://github.com/winstonjs/winston) as the default logger. The configuration file is at `src/logger.ts`.
* All logs are saved in `./logs` directory and at `/logs` in the docker container.
* The `docker-compose` file has a volume attached to container to expose host directory to the container for writing logs.
* Console messages are prettified
* Each line in error log file is a stringified JSON.


### Directory Structure

```
+-- scripts
|   +-- dev.sh
|   +-- setup-github-actions.sh
+-- src
|   +-- controllers
|   |   +-- CoffeeMachineController
|   |   |   +-- index.ts
|   |   +-- CoffeePodController
|   |   |   +-- index.ts
|   +-- errors
|   |   +-- application-error.ts
|   |   +-- bad-request.ts
|   +-- lib
|   |   +-- console-logger
|   |   |   +-- index.ts
|   |   |   +-- winston-transport.ts
|   |   +-- safe-mongo-connection.ts
|   +-- middleware
|   |   +-- request-middleware.ts
|   +-- models
|   |   +-- CoffeeMachine
|   |   |   +-- index.ts
|   |   +-- CoffeePods
|   |   |   +-- index.ts
|   |   +-- plugins
|   |   |   +-- timestamp-plugin.ts
|   +-- public
|   |   +-- index.html
|   +-- app.ts
|   +-- mongo-connection.ts
|   +-- routes.ts
|   +-- server.ts
+-- .env.default
+-- .eslintrc.json
+-- .gitignore
+-- docker-compose.dev.yml
+-- docker-compose.yml
+-- Dockerfile
+-- jest.config.js
+-- LICENSE
+-- nodemon.json
+-- openapi.json
+-- package-lock.json
+-- package.json
+-- README.md
+-- tsconfig.json
```
