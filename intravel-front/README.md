<p align="center">
  <img src="https://i.imgur.com/t1MCuVT.png" alt="IN.TRAVEL Frontend">
</p>

## Description

IN.TRAVEL Frontend is the client-side application for the IN.TRAVEL project, designed to provide a seamless and interactive user experience for managing trips, invitations, activities, and more.

![React](https://img.shields.io/badge/React-20232A.svg?style=for-the-badge&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-B73BFE.svg?style=for-the-badge&logo=vite&logoColor=FFD62E) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC.svg?style=for-the-badge&logo=tailwindcss&logoColor=white) ![Redux](https://img.shields.io/badge/Redux-764ABC.svg?style=for-the-badge&logo=redux&logoColor=white)

## Features

- Interactive Trip Management
- Guest Invitation System
- Activity Scheduler
- Real-time Notifications
- Responsive Design

## Dependencies

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux](https://redux.js.org/)
- [Axios](https://axios-http.com/)
- [React Router](https://reactrouter.com/)

## Installation

Before you start, ensure you have Node.js and npm installed on your computer. If not, download and install them from the official websites.

1. **Clone the Repository**
    ```sh
    git clone https://github.com/DanielF-Cardoso/intravel-frontend.git
    cd intravel-frontend
    ```

2. **Install Dependencies**
    ```sh
    npm install
    ```

3. **API Configuration**
    - To change the API URL used by the frontend application, you need to modify the `lib/axios.ts` file. This file contains the Axios instance used for API requests throughout the application.


4. **Run the Application**
    - For development:
      ```sh
      npm run dev
      ```
    - For production:
      ```sh
      npm run build
      npm run preview
      ```

## Usage

After starting the application, it will be available at `http://localhost:3000`. Navigate through the application to manage trips, send invitations, and more.

## Scripts

- `dev`: Start the Vite server in development mode with hot module replacement.
- `build`: Build the application for production.
- `preview`: Preview the built application.

## License

This project is licensed under the MIT License.