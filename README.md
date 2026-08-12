# TaskFlow Dashboard

A responsive task management dashboard built with React, React Router DOM, and plain CSS. Connects to the [JSONPlaceholder](https://jsonplaceholder.typicode.com/guide/) mock API for CRUD operations.

## Features

- **Dashboard (`/`)**: header with completed-task counter, add-task form (disabled while submitting), task list with checkbox/title/delete, loading/error/empty states.
- **Task Detail (`/tasks/:id`)**: shows Task ID, User ID, Title, Status, a placeholder description, Back button, Delete button.
- Fully responsive layout (mobile, tablet, desktop) using plain CSS media queries.
- Since JSONPlaceholder does not persist data, local React state is treated as the source of truth for all CRUD operations, while the app still calls the real API endpoints as required.

## Tech Stack

- React 18
- React Router DOM 6
- Plain CSS (no frameworks/libraries)
- Fetch API
- Vite (build tool / dev server)

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (comes with Node.js)

## Installation & Running Locally

1. Unzip/clone the project and move into the folder:
   ```bash
   cd taskflow-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the URL shown in the terminal (usually `http://localhost:5173`) in your browser.

## Build for Production

```bash
npm run build
npm run preview
```

The production build will be output to the `dist/` folder.

## Project Structure

```
taskflow-dashboard/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx              # App entry point, router setup
│   ├── App.jsx                # Routes + top-level task state
│   ├── api/
│   │   └── tasksApi.js        # Fetch calls to JSONPlaceholder
│   ├── components/
│   │   ├── AddTaskForm.jsx
│   │   ├── TaskItem.jsx
│   │   └── StatusStates.jsx   # Loading / Error / Empty states
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   └── TaskDetail.jsx
│   └── styles/
│       └── index.css          # All plain CSS, incl. responsive rules
```

## Notes

- `POST`, `PATCH`, and `DELETE` requests to JSONPlaceholder return successful responses but do not actually persist any changes on their server — this is expected behavior of the mock API. The UI reflects all changes via local React state regardless of what the API returns.
- New tasks are assigned a unique local ID (via `Date.now()`) instead of relying on JSONPlaceholder's fixed `id: 201` response, to avoid ID collisions when adding multiple tasks in a session.
