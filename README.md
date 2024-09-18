# Morosystems Homework

This project is a task management application with various functionalities to manage tasks efficiently.

## Features

- Tasks can be added.
- Tasks can be removed.
- Tasks can be renamed.
- Tasks can be marked as completed.
- Tasks can be filtered by completed and not completed.
- All visible tasks can be marked as completed at once.
- All completed tasks can be removed at once.
- The number of completed tasks is displayed.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
  ```sh
  git clone <repository-url>
  ```
2. Navigate to the project directory:
  ```sh
  cd morosystems-homework
  ```
3. Install the dependencies:
  ```sh
  pnpm install
  ```
4. Add .env file
```
VITE_BASE_API_URL=http://localhost:8080 //backend server url
```

## Usage

To start the application, run:
```sh
pnpm run dev
```

Move the backend (https://github.com/morosystems/todo-be) to the `server` folder and run it, or alternatively, run it locally if you already have it set up.

## Misc

I have enhanced the project by adding ESLint plugins to sort keys, remove unused variables, and more. The application is built using React with TypeScript and Vite, and it leverages RTK Query for data fetching, which required some improvisation as i have never used it in projects. For styling, I've utilized the MUI library along with Emotion CSS. Utilize redux for global `filter` state
