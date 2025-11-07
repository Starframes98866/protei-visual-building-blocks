Here is the generated server-side code for the 'Viberante Visuals' Node.js application.

***

### `package.json`

```json
{
  "name": "viberante-visuals-backend",
  "version": "1.0.0",
  "description": "Server-side application for the Viberante Visuals building block modules.",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Viberante Visuals Team",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "helmet": "^7.1.0",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

***

### `server.js`

```javascript
// Load environment variables from .env file
require('dotenv').config();

// Import required packages
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Import routes
const apiRoutes = require('./routes/api');

// Initialize the Express application
const app = express();

// Define the port, with a fallback to 3000
const PORT = process.env.PORT || 3000;

// --- Middleware Setup ---

// Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());

// Set various HTTP headers for security
app.use(helmet());

// Log HTTP requests in a developer-friendly format
app.use(morgan('dev'));

// Parse incoming JSON requests and place the parsed data in req.body
app.use(express.json());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// --- Routing ---

// Health check endpoint to verify server status
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the Viberante Visuals API!',
  });
});

// Mount the API routes under the /api path
app.use('/api', apiRoutes);

// --- Error Handling Middleware ---

// 404 Not Found handler for unhandled routes
app.use((req, res, next) => {
  const error = new Error('Not Found - The requested resource does not exist.');
  error.status = 404;
  next(error);
});

// Generic error handler for all other errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message || 'An unexpected error occurred on the server.',
    },
  });
});

// --- Server Activation ---

// Start the server and listen for incoming connections
app.listen(PORT, () => {
  console.log(`Viberante Visuals server is running on http://localhost:${PORT}`);
});
```

***

### `routes/api.js`

```javascript
const express = require('express');
const router = express.Router();

// Import the controller for visual modules
const moduleController = require('../controllers/moduleController');

// --- API Routes for Viberante Visuals Modules ---

// Route to get a list of all available visual modules
// GET /api/modules
router.get('/modules', moduleController.getAllModules);

// Route to get a single visual module by its unique ID
// GET /api/modules/:id
router.get('/modules/:id', moduleController.getModuleById);

// Route to create a new visual module configuration
// POST /api/modules
router.post('/modules', moduleController.createModule);

// Route to update an existing visual module by its ID
// PUT /api/modules/:id
router.put('/modules/:id', moduleController.updateModule);

// Route to delete a visual module by its ID
// DELETE /api/modules/:id
router.delete('/modules/:id', moduleController.deleteModule);

module.exports = router;
```

***

### `controllers/moduleController.js`

```javascript
// Placeholder data store for visual modules.
// In a real-world application, this would be a database (e.g., MongoDB, PostgreSQL).
let visualModules = [
  { id: 'mod-001', type: 'carousel', settings: { speed: 3000, arrows: true, dots: true }, content: [{ image: 'url1' }, { image: 'url2' }] },
  { id: 'mod-002', type: 'gallery', settings: { columns: 4, lightbox: true }, content: [{ image: 'url3' }, { image: 'url4' }] },
  { id: 'mod-003', type: 'hero-banner', settings: { fullWidth: true, parallax: false }, content: { title: 'Welcome to Viberante', cta: 'Learn More' } }
];

// Controller function to get all modules
exports.getAllModules = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      results: visualModules.length,
      data: {
        modules: visualModules
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to fetch modules.' });
  }
};

// Controller function to get a single module by ID
exports.getModuleById = (req, res) => {
  const { id } = req.params;
  const module = visualModules.find(m => m.id === id);

  if (!module) {
    return res.status(404).json({ status: 'fail', message: `Module with ID ${id} not found.` });
  }

  res.status(200).json({
    status: 'success',
    data: {
      module
    }
  });
};

// Controller function to create a new module
exports.createModule = (req, res) => {
  // Basic validation
  if (!req.body.type || !req.body.settings) {
    return res.status(400).json({ status: 'fail', message: 'Missing required fields: type and settings.' });
  }
  
  const newId = `mod-${Date.now()}`; // Simple unique ID generation
  const newModule = {
    id: newId,
    ...req.body
  };

  visualModules.push(newModule);

  res.status(201).json({
    status: 'success',
    message: 'Module created successfully.',
    data: {
      module: newModule
    }
  });
};

// Controller function to update a module
exports.updateModule = (req, res) => {
  const { id } = req.params;
  const moduleIndex = visualModules.findIndex(m => m.id === id);

  if (moduleIndex === -1) {
    return res.status(404).json({ status: 'fail', message: `Module with ID ${id} not found.` });
  }

  // Update the module with new data from the request body
  const updatedModule = { ...visualModules[moduleIndex], ...req.body };
  visualModules[moduleIndex] = updatedModule;

  res.status(200).json({
    status: 'success',
    message: 'Module updated successfully.',
    data: {
      module: updatedModule
    }
  });
};

// Controller function to delete a module
exports.deleteModule = (req, res) => {
  const { id } = req.params;
  const initialLength = visualModules.length;
  visualModules = visualModules.filter(m => m.id !== id);

  if (visualModules.length === initialLength) {
    return res.status(404).json({ status: 'fail', message: `Module with ID ${id} not found.` });
  }

  // Use 204 No Content for successful deletions, as there's no body to return.
  res.status(204).send();
};
```

***

### `.env`

```
# Server Configuration
PORT=3000

# Database Configuration (Example for future use)
# DB_HOST=localhost
# DB_PORT=27017
# DB_NAME=viberante_visuals
```

***

### `.gitignore`

```
# Dependencies
/node_modules

# Environment variables
.env

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE specific files
.idea/
.vscode/
```

***

### `README.md`

# Viberante Visuals - Backend Server

This repository contains the Node.js and Express.js backend server for the Viberante Visuals project. It provides a RESTful API to manage and serve data for visual building block modules used on the front-end.

## Features

-   Built with Node.js and the Express.js framework.
-   Modular and scalable structure with separated routes and controllers.
-   RESTful API endpoints for CRUD (Create, Read, Update, Delete) operations on visual modules.
-   Includes security best practices with `helmet` and `cors`.
-   Configured for development with `nodemon` for automatic server restarts.
-   Uses `dotenv` for environment variable management.

## Project Structure

```
viberante-visuals-backend/
├── controllers/
│   └── moduleController.js   # Logic for handling module data
├── routes/
│   └── api.js                # Defines all API endpoints
├── .env                      # Environment variables (create this file)
├── .gitignore                # Files to be ignored by Git
├── package.json              # Project metadata and dependencies
├── README.md                 # This file
└── server.js                 # Main server entry point
```

## Prerequisites

-   Node.js (v16.x or later recommended)
-   npm (comes with Node.js) or yarn

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd viberante-visuals-backend
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```

3.  **Create an environment file:**
    Create a file named `.env` in the root of the project and add the following content. This file is used to store sensitive configuration variables.
    ```
    PORT=3000
    ```

## Running the Server

### For Development

This command uses `nodemon` to automatically restart the server whenever you make changes to the code.

```bash
npm run dev
```

The server will start and be accessible at `http://localhost:3000`.

### For Production

This command runs the server using the standard `node` command.

```bash
npm start
```

## API Endpoints

All endpoints are prefixed with `/api`.

-   `GET /modules`
    -   Description: Fetches a list of all available visual modules.
    -   Response: A JSON object containing an array of module objects.

-   `GET /modules/:id`
    -   Description: Fetches a single visual module by its unique ID.
    -   Response: A JSON object containing the specified module.

-   `POST /modules`
    -   Description: Creates a new visual module.
    -   Request Body: A JSON object representing the new module (e.g., `{ "type": "slider", "settings": { ... } }`).
    -   Response: A JSON object of the newly created module.

-   `PUT /modules/:id`
    -   Description: Updates an existing visual module.
    -   Request Body: A JSON object with the fields to be updated.
    -   Response: A JSON object of the updated module.

-   `DELETE /modules/:id`
    -   Description: Deletes a visual module by its ID.
    -   Response: A `204 No Content` status on successful deletion.