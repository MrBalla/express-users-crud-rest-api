# Express Users CRUD REST API

This project is a RESTful API built with Express.js that allows for Create, Read, Update, and Delete (CRUD) operations on user data.

## Features

- Create a new user
- Retrieve details of an existing user
- Update information of an existing user
- Delete a user

## Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. **Clone the repository:**

   ```powershell
   git clone https://github.com/MrBalla/express-users-crud-rest-api.git
   ```

2. **Navigate to the project directory:**

   ```powershell
   cd express-users-crud-rest-api
   ```

3. **Install the dependencies:**

   ```powershell
   npm install
   ```

## Usage

1. **Start the server:**

   ```powershell
   npm start
   ```

   By default, the server will run on `http://localhost:3000`.

2. **API Endpoints:**

   - **Create a new user**

     - **URL:** `POST /users`
     - **Body Parameters:**
       - `name` (string): The name of the user.
       - `email` (string): The email address of the user.

   - **Retrieve a user by ID**

     - **URL:** `GET /users/:id`
     - **URL Parameters:**
       - `:id` (integer): The unique identifier of the user.

   - **Update a user's information**

     - **URL:** `PUT /users/:id`
     - **URL Parameters:**
       - `:id` (integer): The unique identifier of the user.
     - **Body Parameters:**
       - `name` (string): The updated name of the user.
       - `email` (string): The updated email address of the user.

   - **Delete a user**

     - **URL:** `DELETE /users/:id`
     - **URL Parameters:**
       - `:id` (integer): The unique identifier of the user.

## Docker Setup

To run the application using Docker:

1. **Build the Docker image:**

   ```powershell
   docker build -t express-users-crud-rest-api .
   ```

2. **Run the Docker container:**

   ```powershell
   docker run -p 3000:3000 express-users-crud-rest-api
   ```

   The API will be accessible at `http://localhost:3000`.

## Swagger Documentation

1. **Install Swagger dependencies:**

   ```powershell
   npm install swagger-jsdoc swagger-ui-express
   ```

2. **Configure Swagger in your app:**

   ```javascript
   const swaggerJsDoc = require('swagger-jsdoc');
   const swaggerUi = require('swagger-ui-express');

   const swaggerOptions = {
     swaggerDefinition: {
       openapi: '3.0.0',
       info: {
         title: 'Express Users CRUD API',
         version: '1.0.0',
         description: 'A simple Express CRUD API'
       }
     },
     apis: ['./routes/*.js']
   };

   const swaggerDocs = swaggerJsDoc(swaggerOptions);
   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
   ```

   Visit `http://localhost:3000/api-docs` to see your API documentation.

## Auto-reload Setup

1. **Install nodemon:**

   ```powershell
   npm install --save-dev nodemon
   ```

2. **Update your `package.json`:**

   ```json
   "scripts": {
     "start": "nodemon index.js"
   }
   ```

   Now your server will auto-reload on code changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.