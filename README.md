<p align="center">
  <img src="https://i.imgur.com/t1MCuVT.png" alt="IN.TRAVEL">
</p>

# IN.TRAVEL

IN.TRAVEL is a comprehensive project for managing trips, invitations, and activities, divided into two main parts: frontend and backend. This repository contains the code for both parts, providing an integrated solution for an interactive travel management system.

## Overview

The IN.TRAVEL project consists of two main components:

1. **IN.TRAVEL Frontend**: The client-side application for interacting with the system, providing a smooth and interactive user experience.
2. **IN.TRAVEL Backend**: The server-side application that handles all backend operations, including database interactions and API requests.

## Requirements

- Node.js (LTS version recommended)
- npm (or yarn, if preferred)

## Installation

1. **Clone the Repository**

    ```sh
    git clone https://github.com/DanielF-Cardoso/intravel.git
    cd intravel
    ```

2. **Frontend Setup**

    - Navigate to the frontend directory:
      ```sh
      cd intravel-front
      ```
    - Install dependencies:
      ```sh
      npm install
      ```
    - Follow the instructions in the [frontend README](intravel-front/README.md) to configure and run the frontend application.

3. **Backend Setup**

    - Navigate to the backend directory:
      ```sh
      cd intravel-backend
      ```
    - Install dependencies:
      ```sh
      npm install
      ```
    - Configure environment variables and run database migrations as described in the [backend README](intravel-backend/README.md).

## Main Scripts

- **Frontend**:
  - `dev`: Starts the Vite server in development mode.
  - `build`: Compiles the code for production.
  - `preview`: Previews the built application.

- **Backend**:
  - `dev`: Runs the application in development mode with automatic reloading.
  - `build`: Compiles TypeScript code into JavaScript.
  - `start`: Runs the compiled JavaScript code in production mode.

## License

This project is licensed under the MIT License.