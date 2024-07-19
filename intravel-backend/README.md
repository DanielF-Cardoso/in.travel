<p align="center">
  <img src="https://i.imgur.com/t1MCuVT.png" alt="IN.TRAVEL Backend">
</p>

## Description

IN.TRAVEL Backend is the server-side application for the IN.TRAVEL project, designed to handle all backend operations, including database interactions and API requests.

![Node.js](https://img.shields.io/badge/Node.js-339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Fastify](https://img.shields.io/badge/Fastify-000000.svg?style=for-the-badge&logo=fastify&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-2D3748.svg?style=for-the-badge&logo=prisma&logoColor=white) ![Zod](https://img.shields.io/badge/Zod-4A4A55.svg?style=for-the-badge&logo=zod&logoColor=white)

## Features

- Trip Management
- Guest Invitations
- Activity Creation
- Links Creation
- Email Notifications

## Dependencies

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://www.fastify.io/)
- [Prisma](https://www.prisma.io/)
- [Zod](https://zod.dev/)
- [Nodemailer](https://nodemailer.com/)
- [Day.js](https://day.js.org/)

## Installation

Before you start, ensure you have Node.js and npm installed on your computer. If not, download and install them from the official websites.

1. **Clone the Repository**
    ```sh
    git clone https://github.com/DanielF-Cardoso/intravel.git
    cd intravel
    ```

2. **Install Dependencies**
    ```sh
    npm install
    ```

3. **Environment Variables**
    - Rename the `.env.example` file in the root directory to `.env` and add your environment variables.

4. **Database Migration**
    - Run Prisma migrations to set up your database schema:
      ```sh
      npx prisma migrate dev
      ```

5. **Run the Application**
    - For development:
      ```sh
      npm run dev
      ```
    - For production:
      ```sh
      npm run build
      npm start
      ```

## Usage

After starting the server, the API will be available at `http://localhost:3000`. You can use tools like Postman or Insomnia to interact with the API endpoints.

## Scripts

- `dev`: Run the application in development mode with automatic reloading.
- `build`: Compile the TypeScript code into JavaScript.
- `start`: Run the compiled JavaScript code in production mode.

## License

This project is licensed under the MIT License.
