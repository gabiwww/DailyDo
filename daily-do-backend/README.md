***Requirements:*** \
node.js installed [install node.js now](https://nodejs.org/en/download) \
postgres installed [install postgres now](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

***Nice to have:*** \
pgAdmin installed [install pgAdmin now](https://www.pgadmin.org/download/) \
Visual Studio Code installed

## Easy manual to get started:
1. Open Visual Studio Code and open folder with project.
2. Copy the .env.example file, change “localhost:5432” to localhost:port-where-postgres-listens (port that shows up when you open postgres) and name the copied file .env
3. Create a database named daily-do:
      1. Open pgAdmin and click "Add New Server" and type a name, e.g. daily-do 
      2. Click "Connection" and fill connection form (host name is localhost, port from .env file, leave the other fields as they are), Save 
      3. Right click Databases and create a new database named daily-do 
5. Open terminal in Visual Studio Code and install npm by typing: ` npm install `
6. Once the installation is complete, start the project by typing: ` npm run start `

## API Documentation
To ***sign up*** the user you have to request: 
#### POST localhost:PORT/auth/register
(PORT from .env for this example is 3000) \
with JSON body:
```JSON
{
"username": "example-username",
"password": "example-password"
}
```

To ***sign in*** the user you have to request:
#### POST localhost:PORT/auth/login
(PORT from .env for this example is 3000) \
with JSON body:
```JSON
{
"username": "example-username",
"password": "example-password"
}
```
In 200 OK (correct) responce you will get 
```JSON
{
"access_token": "example-jwt-token"
}
```

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## License

Nest is [MIT licensed](LICENSE).
