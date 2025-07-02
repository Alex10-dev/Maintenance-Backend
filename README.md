<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# 📝 Description

**Application for the management, maintenance, and resolution of electronic device issues.**  

Users can create a report for a problem, which will be handled in collaboration with the technical team by adding comments, evidence in files and photographs, allowing the user to track the progress until the issue is fully resolved.
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## 🛠️ Key Features

- Creation of issues
- Assignment and collaboration between users
- File uploads as evidence
- Comments on tasks and reports
- Step-by-step or task-based progress tracking
- Integration with external services (S3, Discord, Email)

## ⚙️ Project setup

1. Recreate the ***.env*** file based on ***.env.template*** file

    ```bash
    PORT
    POSTGRES_URL
    POSTGRES_USER
    POSTGRES_DB
    POSTGRES_PORT
    POSTGRES_PASSWORD
    ```
2. Install the project dependencies:

    ```bash
    $ npm install
    ```

3. Start the PostgreSQL database container:

    ```bash
    $ docker compose up -d
    ```
4. Generate prisma client

    ```bash
    $ npx prisma generate
    ```

5. Run the migrations of database:

    ```bash
    $ npx prisma migrate deploy
    ```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## 🤝 Let's Connect

- **Author -** *Alex Orozco*
- **LinkedIn -** *[alexis-orozco-dev](https://www.linkedin.com/in/alexis-orozco-dev)*
